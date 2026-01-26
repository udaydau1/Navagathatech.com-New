import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getCaseStudyBySlug, getCaseStudies } from "@/lib/case-studies";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, CheckCircle2, ChevronLeft } from "lucide-react";
import type { Metadata } from "next";

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const slug = (await params).slug;
    const study = await getCaseStudyBySlug(slug);

    if (!study) return { title: "Case Study Not Found" };

    return {
        title: `${study.title} | Case Study`,
        description: study.summary,
        openGraph: {
            title: study.title,
            description: study.summary,
            url: `https://www.navagathatech.com/case-studies/${study.slug}`,
            type: "article",
        },
    };
}

export async function generateStaticParams() {
    const studies = await getCaseStudies();
    return studies.map((study) => ({
        slug: study.slug,
    }));
}

export default async function CaseStudyDetailPage({ params }: Props) {
    const slug = (await params).slug;
    const study = await getCaseStudyBySlug(slug);

    if (!study) notFound();

    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            <main className="pt-40 pb-20">
                <div className="container mx-auto px-6 max-w-4xl">
                    <div className="mb-12">
                        <Breadcrumbs
                            items={[
                                { name: "Case Studies", url: "https://www.navagathatech.com/case-studies" },
                                { name: study.title, url: `https://www.navagathatech.com/case-studies/${study.slug}` }
                            ]}
                        />
                    </div>

                    <Link
                        href="/case-studies"
                        className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-8 transition-colors font-semibold"
                    >
                        <ChevronLeft size={18} /> Back to Case Studies
                    </Link>

                    <span className="inline-block py-1 px-4 rounded-full bg-secondary/10 text-primary border border-secondary/20 text-xs font-bold uppercase tracking-widest mb-6">
                        {study.category}
                    </span>

                    <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8 leading-tight">
                        {study.title}
                    </h1>

                    <div className="p-8 bg-primary text-white rounded-[40px] mb-12 shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px]" />
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold mb-4 text-secondary">The Challenge & Outcome</h2>
                            <p className="text-lg leading-relaxed opacity-90">
                                {study.summary}
                            </p>
                        </div>
                    </div>

                    <div className="prose prose-lg max-w-none text-foreground-muted mb-16">
                        <h2 className="text-2xl font-bold text-primary mb-6">Strategic Implementation</h2>
                        <p className="leading-relaxed mb-8">
                            {study.content}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-10 rounded-[40px] border border-gray-100">
                        <h3 className="text-xl font-bold text-primary mb-8">Related Expertise & Capabilities</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {study.links.map((link, idx) => (
                                <Link
                                    key={idx}
                                    href={link.url}
                                    className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100 font-bold text-primary hover:border-secondary transition-all group shadow-sm hover:shadow-md"
                                >
                                    {link.name}
                                    <ArrowRight size={18} className="text-secondary group-hover:translate-x-1 transition-transform" />
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
