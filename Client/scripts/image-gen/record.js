// Records PNG frames into a video with the browser's MediaRecorder (no ffmpeg needed).
// Usage: node scripts/image-gen/record.js <framesDir> <output.mp4>
const fs = require("fs");
const path = require("path");
const http = require("http");
const puppeteer = require("puppeteer");

const [dir, output] = process.argv.slice(2);
const FPS = 30;
const EDGE = "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe";

(async () => {
    const frames = fs.readdirSync(dir).filter((f) => f.endsWith(".png")).sort();
    // Serve the frames over localhost so the page can load them
    const server = http.createServer((req, res) => {
        const f = path.join(dir, decodeURIComponent(req.url.slice(1)));
        if (req.url === "/") { res.setHeader("Content-Type", "text/html"); return res.end("<canvas id=c width=1080 height=1080></canvas>"); }
        if (!fs.existsSync(f)) { res.statusCode = 404; return res.end(); }
        res.setHeader("Content-Type", "image/png");
        fs.createReadStream(f).pipe(res);
    }).listen(0);
    const port = server.address().port;

    const browser = await puppeteer.launch({ executablePath: fs.existsSync(EDGE) ? EDGE : undefined, headless: "new", protocolTimeout: 600000 });
    const page = await browser.newPage();
    await page.goto(`http://127.0.0.1:${port}/`);
    const result = await page.evaluate(async (names, fps) => {
        // Decode every frame first so playback is smooth
        const imgs = await Promise.all(names.map((n) => new Promise((ok, bad) => { const i = new Image(); i.onload = () => ok(i); i.onerror = bad; i.src = "/" + n; })));
        await Promise.all(imgs.map((i) => i.decode()));
        const c = document.getElementById("c");
        const ctx = c.getContext("2d");
        ctx.drawImage(imgs[0], 0, 0);
        const types = ["video/mp4;codecs=avc1.640028", "video/mp4;codecs=avc1.42E01E", "video/mp4", "video/webm;codecs=vp9"];
        const mimeType = types.find((t) => MediaRecorder.isTypeSupported(t));
        const stream = c.captureStream(fps);
        const rec = new MediaRecorder(stream, { mimeType, videoBitsPerSecond: 8_000_000 });
        const chunks = [];
        rec.ondataavailable = (e) => e.data.size && chunks.push(e.data);
        const done = new Promise((r) => (rec.onstop = r));
        rec.start();
        const start = performance.now();
        for (let i = 0; i < imgs.length; i++) {
            ctx.drawImage(imgs[i], 0, 0);
            // hold each frame until its time slot, correcting for drift
            const wait = start + ((i + 1) * 1000) / fps - performance.now();
            if (wait > 0) await new Promise((r) => setTimeout(r, wait));
        }
        rec.stop();
        await done;
        const blob = new Blob(chunks, { type: mimeType });
        const buf = new Uint8Array(await blob.arrayBuffer());
        let bin = "";
        for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode.apply(null, buf.subarray(i, i + 0x8000));
        return { mimeType, data: btoa(bin) };
    }, frames, FPS);
    const ext = result.mimeType.startsWith("video/mp4") ? ".mp4" : ".webm";
    const file = output.replace(/\.(mp4|webm)$/, "") + ext;
    fs.writeFileSync(file, Buffer.from(result.data, "base64"));
    console.log(result.mimeType, file, Math.round(fs.statSync(file).size / 1024) + " KB");
    await browser.close();
    server.close();
})();
