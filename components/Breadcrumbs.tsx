"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
    name: string;
    url: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumbs({ items, className = "" }: BreadcrumbsProps) {
    // Always include Home as the first item
    const allItems: BreadcrumbItem[] = [
        { name: "Home", url: "https://www.navagathatech.com" },
        ...items
    ];

    // Generate schema markup
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": allItems.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };

    return (
        <>
            {/* Schema markup */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            {/* Visual breadcrumbs */}
            <nav
                aria-label="Breadcrumb"
                className={`flex items-center gap-2 text-sm ${className}`}
            >
                {allItems.map((item, index) => {
                    const isLast = index === allItems.length - 1;
                    const isFirst = index === 0;

                    return (
                        <div key={item.url} className="flex items-center gap-2">
                            {index > 0 && (
                                <ChevronRight
                                    size={14}
                                    className="text-gray-400"
                                    aria-hidden="true"
                                />
                            )}
                            {isLast ? (
                                <span
                                    className="text-primary font-medium"
                                    aria-current="page"
                                >
                                    {item.name}
                                </span>
                            ) : (
                                <Link
                                    href={item.url}
                                    className="text-gray-600 hover:text-primary transition-colors flex items-center gap-1"
                                >
                                    {isFirst && <Home size={14} />}
                                    {item.name}
                                </Link>
                            )}
                        </div>
                    );
                })}
            </nav>
        </>
    );
}
