"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

type Edit = { kind: "text" | "img" | "alt"; original: string; value: string };

const norm = (p: string) => (p.endsWith("/") ? p : p + "/").toLowerCase();

/**
 * Page Editor changes are applied to the HTML on the server (proxy.ts).
 * This keeps them applied in the browser too: inside client components and after client-side navigation.
 */
export default function PageEditsApplier({ all }: { all: { path: string; edits: Edit[] }[] }) {
    const pathname = usePathname();

    useEffect(() => {
        if (pathname.startsWith("/admin")) return;
        const edits = all.filter((d) => d.path === "*" || d.path === norm(pathname)).flatMap((d) => d.edits);
        if (!edits.length) return;
        const text = new Map(edits.filter((e) => e.kind === "text").map((e) => [e.original, e.value]));
        const imgs = edits.filter((e) => e.kind === "img");
        const alts = new Map(edits.filter((e) => e.kind === "alt").map((e) => [e.original, e.value]));

        const fixImg = (img: HTMLImageElement) => {
            for (const e of imgs) {
                for (const attr of ["src", "srcset"]) {
                    const v = img.getAttribute(attr);
                    if (!v) continue;
                    const n = v === e.original ? e.value : v.split(`url=${encodeURIComponent(e.original)}&`).join(`url=${encodeURIComponent(e.value)}&`);
                    if (n !== v) img.setAttribute(attr, n);
                }
            }
            const a = img.getAttribute("alt");
            if (a && alts.has(a)) img.setAttribute("alt", alts.get(a)!);
        };
        const apply = (root: Node) => {
            if (root.nodeType === 3) {
                const v = text.get(root.nodeValue || "");
                if (v !== undefined) root.nodeValue = v;
                return;
            }
            if (!(root instanceof Element)) return;
            if (root.tagName === "IMG") fixImg(root as HTMLImageElement);
            if (text.size) {
                const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
                for (let n = w.nextNode(); n; n = w.nextNode()) {
                    const v = text.get(n.nodeValue || "");
                    if (v !== undefined) n.nodeValue = v;
                }
            }
            if (imgs.length || alts.size) root.querySelectorAll("img").forEach(fixImg);
        };

        apply(document.body);
        const obs = new MutationObserver((list) => {
            for (const m of list) {
                if (m.type === "characterData") apply(m.target);
                else if (m.type === "attributes") fixImg(m.target as HTMLImageElement);
                else m.addedNodes.forEach(apply);
            }
        });
        obs.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: ["src", "srcset", "alt"] });
        return () => obs.disconnect();
    }, [all, pathname]);

    return null;
}
