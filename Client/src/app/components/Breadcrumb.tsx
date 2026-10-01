import Link from 'next/link';
import './Breadcrumb.css';

interface BreadcrumbItem {
    label: string;
    url: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.label,
            "item": `https://mailstora.com${item.url}`
        }))
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav aria-label="breadcrumb" className="breadcrumb-nav">
                <ol className="breadcrumb-list">
                    {items.map((item, index) => (
                        <li key={index} className="breadcrumb-item">
                            {index === items.length - 1 ? (
                                <span className="breadcrumb-current" aria-current="page">{item.label}</span>
                            ) : (
                                <>
                                    <Link href={item.url} className="breadcrumb-link">{item.label}</Link>
                                    <span className="breadcrumb-separator">›</span>
                                </>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}
