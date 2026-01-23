"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CheckCircle2, MapPin, Clock, Briefcase, ChevronLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

const jobDetails = {
    "senior-software-engineer": {
        title: "Senior Software Engineer",
        department: "Engineering",
        location: "Mumbai, IN / Remote",
        type: "Full-time",
        overview: "We are looking for a Senior Software Engineer to lead the development of our next-generation enterprise applications. You will work with a team of high-performing engineers to build scalable, reliable, and secure systems.",
        responsibilities: [
            "Design and develop complex web applications using Next.js and TypeScript.",
            "Architect scalable microservices and manage cloud infrastructure.",
            "Mentor junior engineers and conduct rigorous code reviews.",
            "Collaborate with product managers to define technical roadmaps.",
            "Optimize application performance for maximum speed and scalability."
        ],
        requirements: [
            "5+ years of experience in full-stack development.",
            "Expertise in React, Next.js, and Node.js.",
            "Strong understanding of AWS/Azure cloud services.",
            "Experience with PostgreSQL/MongoDB and Redis.",
            "Excellent problem-solving and communication skills."
        ],
        benefits: [
            "Competitive Salary & Annual Bonus",
            "Flexible Remote Work Options",
            "Health & Wellness Insurance",
            "Personalized Learning & Development Budget",
            "Lean & Agile Work Culture"
        ]
    },
    "sap-consultant-(abap)": {
        title: "SAP Consultant (ABAP)",
        department: "Enterprise Systems",
        location: "Mumbai, IN",
        type: "Full-time",
        overview: "Join our Enterprise Systems team as an SAP ABAP Consultant. You will play a key role in designing and implementing custom S/4HANA solutions for our global clients.",
        responsibilities: [
            "Develop and maintain custom ABAP programs (Reports, Interfaces, Enhancements).",
            "Perform technical analysis and design based on functional requirements.",
            "Troubleshoot complex issues in S/4HANA environments.",
            "Integrate SAP systems with third-party applications.",
            "Support system upgrades and performance tuning."
        ],
        requirements: [
            "4+ years of hands-on ABAP development experience.",
            "In-depth knowledge of SAP S/4HANA architecture.",
            "Proficient in OData, CDS Views, and BAdIs.",
            "Experience with SAP Fiori/UI5 is a major plus.",
            "Strong analytical and documentation skills."
        ],
        benefits: [
            "Global Project Exposure",
            "S/4HANA Certification Support",
            "Collaborative Team Environment",
            "Competitive Benefits Package"
        ]
    },
    "it-support-analyst": {
        title: "IT Support Analyst",
        department: "Managed Services",
        location: "Mumbai, IN",
        type: "Contract",
        overview: "We seek a proactive IT Support Analyst to provide mission-critical support for our diverse infrastructure landscape. You will ensure high availability and performance of client systems.",
        responsibilities: [
            "Monitor and maintain server health and network connectivity.",
            "Provide level 2/3 technical support for infrastructure issues.",
            "Automate routine maintenance tasks using scripting (PowerShell/Bash).",
            "Manage incident tickets and documentation.",
            "Assist in system migrations and patch management."
        ],
        requirements: [
            "3+ years in IT infrastructure or managed services.",
            "Proficiency in Windows Server and Linux environments.",
            "Solid understanding of networking protocols (TCP/IP, DNS).",
            "Experience with ITSM tools like ServiceNow or Jira.",
            "Ability to work in rotational shifts if required."
        ],
        benefits: [
            "Technical Skill Diversification",
            "Strategic Role in Client Operations",
            "Performance-based Incentives"
        ]
    }
};

export default function JobDescriptionPage() {
    const { slug } = useParams();
    const job = jobDetails[slug as keyof typeof jobDetails];

    if (!job) {
        return (
            <div className="min-h-screen bg-background font-sans">
                <Header />
                <section className="pt-40 text-center">
                    <h1 className="text-3xl font-bold text-primary mb-4">Job Not Found</h1>
                    <Link href="/careers" className="text-secondary font-bold hover:underline">Back to Careers</Link>
                </section>
                <Footer />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            <section className="pt-44 pb-20">
                <div className="container mx-auto px-6 max-w-5xl">
                    <motion.div {...fadeIn}>
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
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
