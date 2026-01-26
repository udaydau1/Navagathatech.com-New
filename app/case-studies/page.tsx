import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCaseStudies } from "@/lib/case-studies";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Case Studies | Navagatha Tech",
    description: "Explore our success stories and see how Navagatha Tech helps businesses transform their IT landscape through innovation and expertise.",
    keywords: ["IT Case Studies", "Software Development Success Stories", "Legacy Modernization Examples", "Digital Transformation Case Studies"],
};

export default async function CaseStudiesPage() {
    const studies = await getCaseStudies();

    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            <main className="pt-40 pb-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-12">
                        <Breadcrumbs
                            items={[
                                { name: "Case Studies", url: "https://www.navagathatech.com/case-studies" }
                            ]}
                        />
                    </div>

                    <div className="text-center mb-20 max-w-4xl mx-auto">
                        <h1 className="text-4xl md:text-6xl font-extrabold text-primary mb-8">
                            Success Stories & <br />
                            <span className="text-secondary text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Case Studies</span>
                        </h1>
                        <p className="text-xl text-foreground-muted leading-relaxed">
                            Discover how we've helped global enterprises modernize their legacy systems, adopt cutting-edge AI, and build future-ready application landscapes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {studies.map((study) => (
                            <div
                                key={study.id}
                                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 group flex flex-col h-full"
                            >
                                <div className="mb-6">
                                    <span className="inline-block py-1 px-3 rounded-full bg-primary/5 text-primary text-xs font-bold uppercase tracking-wider mb-4">
                                        {study.category}
                                    </span>
                                    <h2 className="text-2xl font-bold text-primary group-hover:text-secondary transition-colors mb-4">
                                        {study.title}
                                    </h2>
                                    <p className="text-foreground-muted text-sm leading-relaxed mb-6">
                                        {study.summary}
                                    </p>
                                </div>
                                <div className="mt-auto flex items-center justify-between">
                                    <span className="text-xs font-medium text-gray-400">Client: {study.client}</span>
                                    <Link
                                        href={`/case-studies/${study.slug}`}
                                        className="inline-flex items-center gap-2 text-primary font-bold hover:text-secondary transition-all"
                                    >
                                        Case Study <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
