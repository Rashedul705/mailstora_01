import "./PageDecor.css";

// Email-themed line icons used as faint decoration
const PATHS = [
    "M3 5h18v14H3zM3 7l9 6 9-6", // envelope
    "M22 2L11 13M22 2l-7 20-4-9-9-4z", // paper plane
    "M8 7l-5 5 5 5M16 7l5 5-5 5M14 4l-4 16", // code
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8", // @
    "M22 12h-6l-2 3h-4l-2-3H2M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z", // inbox
    "M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z", // star
    "M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0", // bell
    "M20 6L9 17l-5-5", // check
];

// Positions along the page edges, roughly 5 to 6 per screen height, so they never sit on body text
const COUNT = 64;
const ITEMS = Array.from({ length: COUNT }, (_, i) => {
    const side = i % 2 === 0 ? "left" : "right";
    const edge = 1.5 + ((i * 37) % 7); // 1.5% to 7.5% from the edge
    return {
        top: `${(i + 0.5) * (100 / COUNT)}%`,
        [side]: `${edge}%`,
        size: 28 + ((i * 13) % 5) * 8, // 28px to 60px
        rotate: ((i * 47) % 50) - 25,
        path: PATHS[i % PATHS.length],
        tone: i % 3 === 0 ? "green" : "orange",
        delay: `${-(i % 7)}s`,
    };
});

/** Faint floating email icons spread down the whole page. Purely decorative. */
export default function PageDecor() {
    return (
        <div className="page-decor" aria-hidden="true">
            {ITEMS.map(({ path, size, rotate, tone, delay, ...pos }, i) => (
                <svg
                    key={i}
                    className={`page-decor-icon page-decor-icon--${tone}`}
                    viewBox="0 0 24 24"
                    width={size}
                    height={size}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ ...pos, rotate: `${rotate}deg`, animationDelay: delay }}
                >
                    <path d={path} />
                </svg>
            ))}
        </div>
    );
}
