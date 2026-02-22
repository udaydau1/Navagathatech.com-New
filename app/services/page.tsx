import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getServices } from "@/lib/services";

export const metadata: Metadata = {
    title: "IT Services",
    description:
        "Explore Navagatha Tech IT services across AS400 modernization, SAP transformation, cloud migration, legacy modernization, Java and .NET development.",
    keywords: [
        "IT services",
        "AS400 modernization services",
        "SAP transformation services",
        "cloud migration services",
        "legacy modernization services",
        "Java development services",
        ".NET development services",
        "digital transformation partner",
    ],
    alternates: {
        canonical: "/services",
    },
    openGraph: {
        title: "IT Services | Navagatha Tech",
        description:
            "Enterprise IT services for AS400 modernization, SAP transformation, cloud migration and industry-focused digital transformation.",
        url: "https://www.navagathatech.com/services",
    },
};

export default function ServicesPage() {
    const services = getServices();

    const itemListSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Navagatha Tech Service Portfolio",
        "itemListElement": services.map((service, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": service.title,
            "url": `https://www.navagathatech.com/services/${service.slug}`,
        })),
    };

    return (
        <div className="min-h-screen bg-background font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
            />

            <Header />

            <main className="pt-40 pb-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-10">
                        <Breadcrumbs items={[{ name: "Services", url: "https://www.navagathatech.com/services" }]} />
                    </div>

                    <section className="text-center max-w-4xl mx-auto mb-16">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-6">
                            Enterprise IT Services for Modernization and Growth
                        </h1>
                        <p className="text-lg text-foreground-muted leading-relaxed">
                            We deliver measurable outcomes across AS400 modernization, SAP transformation, cloud adoption,
                            legacy platform transformation and custom software engineering for Java and .NET.
                        </p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8">
                        {services.map((service) => (
                            <article
                                key={service.slug}
                                className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all"
                            >
                                <h2 className="text-2xl font-bold text-primary mb-4">{service.title}</h2>
                                <p className="text-foreground-muted mb-5 leading-relaxed">{service.summary}</p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {service.primaryKeywords.slice(0, 4).map((keyword) => (
                                        <span
                                            key={keyword}
                                            className="text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-primary/5 text-primary border border-primary/10"
                                        >
                                            {keyword}
                                        </span>
                                    ))}
                                </div>

                                <Link
                                    href={`/services/${service.slug}`}
                                    className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-colors"
                                >
                                    Explore Service <ArrowRight size={18} />
                                </Link>
                            </article>
                        ))}
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
