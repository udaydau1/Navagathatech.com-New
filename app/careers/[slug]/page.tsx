import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, MapPin, Clock, Briefcase, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getJobBySlug } from "@/lib/jobs";
import { ClientMotionWrapper } from "@/components/ClientMotionWrapper";
import { notFound } from "next/navigation";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

export default async function JobDescriptionPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = await getJobBySlug(slug);

    if (!job) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <Header />

            <main className="flex-grow pt-44 pb-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <ClientMotionWrapper {...fadeIn}>
                        <Link href="/careers" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-10 transition-colors font-semibold">
                            <ChevronLeft size={18} /> Back to Careers
                        </Link>

                        <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-sm border border-gray-100 mb-12">
                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] px-3 py-1.5 bg-[#D4AF37]/10 rounded-full border border-[#D4AF37]/20">
                                    {job.department}
                                </span>
                                <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
                                    {job.type}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-8">{job.title}</h1>
                            <div className="flex flex-wrap gap-6 text-sm font-medium text-foreground-muted">
                                <div className="flex items-center gap-2">
                                    <MapPin size={18} className="text-[#D4AF37]" />
                                    {job.location}
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock size={18} className="text-[#D4AF37]" />
                                    Posted Recently
                                </div>
                                <div className="flex items-center gap-2">
                                    <Briefcase size={18} className="text-[#D4AF37]" />
                                    Experience: Mid-Senior
                                </div>
                            </div>
                        </div>

                        <div className="grid lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 space-y-12">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary mb-6">Overview</h2>
                                    <p className="text-lg text-foreground-muted leading-relaxed">
                                        {job.overview}
                                    </p>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-primary mb-6">Responsibilities</h2>
                                    <ul className="space-y-4">
                                        {job.responsibilities.map((item, idx) => (
                                            <li key={idx} className="flex gap-4 text-foreground-muted leading-relaxed">
                                                <CheckCircle2 size={24} className="text-secondary shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h2 className="text-2xl font-bold text-primary mb-6">Requirements</h2>
                                    <ul className="space-y-4">
                                        {job.requirements.map((item, idx) => (
                                            <li key={idx} className="flex gap-4 text-foreground-muted leading-relaxed">
                                                <CheckCircle2 size={24} className="text-secondary shrink-0 mt-0.5" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="space-y-8">
                                <div className="bg-primary/5 p-8 rounded-[32px] border border-primary/10">
                                    <h3 className="text-xl font-bold text-primary mb-6">Benefits</h3>
                                    <ul className="space-y-4">
                                        {job.benefits.map((item, idx) => (
                                            <li key={idx} className="text-sm font-semibold text-primary/80 flex items-center gap-3">
                                                <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="sticky top-24">
                                    <h3 className="text-xl font-bold text-primary mb-4">Ready to apply?</h3>
                                    <p className="text-sm text-foreground-muted mb-8">Submit your application today and join our visionary team.</p>
                                    <Link
                                        href={`/careers/apply?job=${encodeURIComponent(job.title)}`}
                                        className="w-full flex items-center justify-center gap-3 py-5 bg-primary text-white font-extrabold rounded-2xl hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                                    >
                                        Apply for this Job <ArrowRight size={20} />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </ClientMotionWrapper>
                </div>
            </main>

            <Footer />
        </div>
    );
}
