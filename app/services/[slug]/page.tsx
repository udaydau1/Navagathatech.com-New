import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getServiceBySlug, getServices } from "@/lib/services";
import { getServiceSchema, getFAQPageSchema } from "@/lib/schema";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        return {
            title: "Service Not Found",
            robots: { index: false, follow: false },
        };
    }

    return {
        title: service.title,
        description: service.metaDescription,
        keywords: service.primaryKeywords,
        alternates: {
            canonical: `/services/${service.slug}`,
        },
        openGraph: {
            title: `${service.shortTitle} | Navagatha Tech`,
            description: service.metaDescription,
            url: `https://www.navagathatech.com/services/${service.slug}`,
            type: "article",
        },
    };
}

export async function generateStaticParams() {
    return getServices().map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params;
    const service = getServiceBySlug(slug);

    if (!service) {
        notFound();
    }

    const serviceSchema = getServiceSchema({
        name: service.title,
        description: service.metaDescription,
        category: "IT Services",
    });

    const faqSchema = getFAQPageSchema(service.faqs);

    return (
        <div className="min-h-screen bg-background font-sans">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <Header />

            <main className="pt-40 pb-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="mb-10">
                        <Breadcrumbs
                            items={[
                                { name: "Services", url: "https://www.navagathatech.com/services" },
                                { name: service.shortTitle, url: `https://www.navagathatech.com/services/${service.slug}` },
                            ]}
                        />
                    </div>

                    <section className="mb-12">
                        <span className="inline-block py-1 px-4 rounded-full bg-secondary/10 text-primary border border-secondary/20 text-xs font-bold uppercase tracking-widest mb-5">
                            {service.shortTitle}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6 leading-tight">{service.hero}</h1>
                        <p className="text-lg text-foreground-muted leading-relaxed">{service.summary}</p>
                    </section>

                    <section className="grid md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-white rounded-3xl border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-primary mb-5">Business Outcomes</h2>
                            <ul className="space-y-4">
                                {service.outcomes.map((item) => (
                                    <li key={item} className="flex gap-3 text-foreground-muted">
                                        <CheckCircle2 size={20} className="text-secondary shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white rounded-3xl border border-gray-100 p-8">
                            <h2 className="text-2xl font-bold text-primary mb-5">What We Deliver</h2>
                            <ul className="space-y-4">
                                {service.offerings.map((item) => (
                                    <li key={item} className="flex gap-3 text-foreground-muted">
                                        <CheckCircle2 size={20} className="text-secondary shrink-0 mt-0.5" />
                                        <span>{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section className="bg-primary text-white rounded-3xl p-8 md:p-10 mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold mb-4">Industries We Support</h2>
                        <p className="opacity-80 mb-6">
                            Our delivery model is tuned for high-compliance, high-scale business environments.
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {service.industries.map((industry) => (
                                <span
                                    key={industry}
                                    className="text-xs font-bold uppercase tracking-widest px-3 py-2 rounded-full bg-white/10 border border-white/20"
                                >
                                    {industry}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white rounded-3xl border border-gray-100 p-8 mb-12">
                        <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            {service.faqs.map((faq) => (
                                <article key={faq.question}>
                                    <h3 className="text-lg font-bold text-primary mb-2">{faq.question}</h3>
                                    <p className="text-foreground-muted leading-relaxed">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="flex flex-wrap gap-4">
                        <Link
                            href="/contact"
                            className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all"
                        >
                            Talk to an Expert
                        </Link>
                        <Link
                            href="/case-studies"
                            className="px-8 py-4 bg-white text-primary border border-primary/20 font-bold rounded-full hover:border-primary transition-all inline-flex items-center gap-2"
                        >
                            View Related Case Studies <ArrowRight size={18} />
                        </Link>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
