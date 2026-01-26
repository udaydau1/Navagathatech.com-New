/**
 * Centralized Schema.org structured data utilities
 * Generates JSON-LD for various schema types used across the site
 */

export interface Job {
    id: string;
    title: string;
    description: string;
    department: string;
    type: string;
    location: string;
    slug: string;
    datePosted?: string;
}

export interface Service {
    name: string;
    description: string;
    category: string;
}

export interface FAQItem {
    question: string;
    answer: string;
}

export interface BreadcrumbItem {
    name: string;
    url: string;
}

const baseUrl = 'https://www.navagathatech.com';

/**
 * Enhanced Organization Schema with LocalBusiness
 */
export function getOrganizationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": ["Organization", "LocalBusiness"],
        "name": "Navagatha Tech Pvt. Ltd.",
        "url": baseUrl,
        "logo": `${baseUrl}/images/logo_navagatha.png`,
        "image": `${baseUrl}/images/logo_navagatha.png`,
        "description": "Next-generation IT services company driven by technology innovation and reliable delivery. We specialize in application development, digital transformation, legacy modernization and enterprise solutions.",
        "foundingDate": "2024",
        "slogan": "Empowering Businesses Through Technology Innovation",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 22 45705334",
            "contactType": "customer service",
            "email": "info@navagathatech.com",
            "availableLanguage": ["en", "Hindi"],
            "areaServed": "IN"
        },
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Office No. 112, A wing, 1st floor, Crystal plaza premises co - operative society ltd. New link road, Opposite infinity mall",
            "addressLocality": "Andheri (west) Mumbai",
            "addressRegion": "Maharashtra",
            "postalCode": "400053",
            "addressCountry": "IN"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": "19.1334",
            "longitude": "72.8267"
        },
        "sameAs": [
            // Add social media URLs when available
        ],
        "areaServed": {
            "@type": "GeoCircle",
            "geoMidpoint": {
                "@type": "GeoCoordinates",
                "latitude": "19.1334",
                "longitude": "72.8267"
            },
            "geoRadius": "Global"
        },
        "priceRange": "$$",
        "openingHours": "Mo-Fr 09:00-18:00",
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "IT Services",
            "itemListElement": [
                {
                    "@type": "OfferCatalog",
                    "name": "Application Development",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Web & Mobile Development",
                                "description": "End-to-end development of scalable web and mobile applications"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "AI & Machine Learning",
                                "description": "Intelligent automation and predictive analytics solutions"
                            }
                        }
                    ]
                },
                {
                    "@type": "OfferCatalog",
                    "name": "Digital Transformation",
                    "itemListElement": [
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Legacy Modernization",
                                "description": "AS400, Mainframe and legacy system transformation"
                            }
                        },
                        {
                            "@type": "Offer",
                            "itemOffered": {
                                "@type": "Service",
                                "name": "Cloud Migration",
                                "description": "Seamless migration to cloud infrastructure"
                            }
                        }
                    ]
                }
            ]
        }
    };
}

/**
 * WebSite Schema with Search Action
 */
export function getWebSiteSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Navagatha Tech",
        "url": baseUrl,
        "description": "Next-generation IT services and digital transformation solutions",
        "publisher": {
            "@type": "Organization",
            "name": "Navagatha Tech Pvt. Ltd.",
            "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/logo_navagatha.png`
            }
        },
        "potentialAction": {
            "@type": "SearchAction",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${baseUrl}/search?q={search_term_string}`
            },
            "query-input": "required name=search_term_string"
        }
    };
}

/**
 * Service Schema Generator
 */
export function getServiceSchema(service: Service) {
    return {
        "@context": "https://schema.org",
        "@type": "Service",
        "name": service.name,
        "description": service.description,
        "provider": {
            "@type": "Organization",
            "name": "Navagatha Tech Pvt. Ltd.",
            "url": baseUrl
        },
        "serviceType": service.category,
        "areaServed": {
            "@type": "Country",
            "name": "India"
        }
    };
}

/**
 * JobPosting Schema Generator
 */
export function getJobPostingSchema(job: Job) {
    return {
        "@context": "https://schema.org",
        "@type": "JobPosting",
        "title": job.title,
        "description": job.description,
        "identifier": {
            "@type": "PropertyValue",
            "name": "Navagatha Tech",
            "value": job.id
        },
        "datePosted": job.datePosted || new Date().toISOString(),
        "validThrough": new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days from now
        "employmentType": job.type.toUpperCase(),
        "hiringOrganization": {
            "@type": "Organization",
            "name": "Navagatha Tech Pvt. Ltd.",
            "sameAs": baseUrl,
            "logo": `${baseUrl}/images/logo_navagatha.png`
        },
        "jobLocation": {
            "@type": "Place",
            "address": {
                "@type": "PostalAddress",
                "addressLocality": job.location,
                "addressCountry": "IN"
            }
        },
        "baseSalary": {
            "@type": "MonetaryAmount",
            "currency": "INR",
            "value": {
                "@type": "QuantitativeValue",
                "value": "Competitive",
                "unitText": "YEAR"
            }
        },
        "industry": "Information Technology",
        "occupationalCategory": job.department,
        "url": `${baseUrl}/careers/${job.slug}`
    };
}

/**
 * FAQPage Schema Generator
 */
export function getFAQPageSchema(faqs: FAQItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqs.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": {
                "@type": "Answer",
                "text": faq.answer
            }
        }))
    };
}

/**
 * BreadcrumbList Schema Generator
 */
export function getBreadcrumbSchema(items: BreadcrumbItem[]) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
        }))
    };
}

/**
 * ContactPage Schema
 */
export function getContactPageSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "Contact Navagatha Tech",
        "description": "Get in touch with Navagatha Tech for IT services, digital transformation and enterprise solutions",
        "url": `${baseUrl}/contact`,
        "mainEntity": {
            "@type": "Organization",
            "name": "Navagatha Tech Pvt. Ltd.",
            "contactPoint": [
                {
                    "@type": "ContactPoint",
                    "telephone": "+91 22 45705334",
                    "contactType": "customer service",
                    "email": "info@navagathatech.com",
                    "availableLanguage": ["en", "Hindi"]
                },
                {
                    "@type": "ContactPoint",
                    "email": "hr@navagathatech.com",
                    "contactType": "recruitment",
                    "availableLanguage": ["en", "Hindi"]
                }
            ]
        }
    };
}
