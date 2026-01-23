"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Briefcase, MapPin, Clock, ArrowRight, Star, Heart, Zap, Globe } from "lucide-react";
import Link from "next/link";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
};

const jobs = [
    {
        title: "Senior Software Engineer",
        department: "Engineering",
        location: "Mumbai, IN / Remote",
        type: "Full-time",
        description: "Build next-generation enterprise applications using Next.js, TypeScript, and Microservices.",
    },
    {
        title: "SAP Consultant (ABAP)",
        department: "Enterprise Systems",
        location: "Mumbai, IN",
        type: "Full-time",
        description: "Design and implement custom SAP S/4HANA solutions for global clients.",
    },
    {
        title: "IT Support Analyst",
        department: "Managed Services",
        location: "Mumbai, IN",
        type: "Contract",
        description: "Provide mission-critical support for legacy and modern infrastructure landscapes.",
    },
];

const values = [
    { icon: Star, title: "Innovation First", desc: "We push the boundaries of what's possible with modern tech." },
    { icon: Heart, title: "People Centric", desc: "Our lean structure ensures direct mentorship and growth." },
    { icon: Zap, title: "Agile Growth", desc: "Rapidly evolve your skills across a diverse tech spectrum." },
    { icon: Globe, title: "Global Impact", desc: "Work on strategic projects that transform major businesses." },
];

export default function CareersPage() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            {/* Hero Section */}
            <section className="pt-40 pb-20 bg-primary text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 translate-x-1/2" />
                <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
                    <motion.div {...fadeIn}>
                        <span className="inline-block py-1 px-4 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-widest mb-6">
                            Join Navagatha Tech
                        </span>
                        <h1 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">
                            Build the Future of <br />
                            <span className="text-white">Enterprise Technology</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                            We're looking for passionate innovators, legacy experts, and bold thinkers to help us transform the global IT landscape.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-primary mb-4">Why Navagatha?</h2>
                        <p className="text-foreground-muted max-w-2xl mx-auto">
                            We offer a unique environment where legacy reliability meets startup-speed innovation.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-4 gap-8">
                        {values.map((value, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeIn}
                                transition={{ delay: idx * 0.1 }}
                                className="p-8 rounded-2xl bg-background border border-border hover:border-secondary transition-all group"
                            >
                                <div className="w-12 h-12 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary group-hover:text-primary transition-colors">
                                    <value.icon size={24} />
                                </div>
                                <h3 className="font-bold text-lg mb-3">{value.title}</h3>
                                <p className="text-sm text-foreground-muted leading-relaxed">{value.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Jobs Section */}
            <section className="py-24 bg-background-alt">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                        <div>
                            <h2 className="text-3xl font-bold text-primary mb-2">Open Opportunities</h2>
                            <p className="text-foreground-muted">Explore our current vacancies across technologies.</p>
                        </div>
                        <div className="text-sm font-semibold text-primary px-4 py-2 bg-white rounded-full border border-border">
                            {jobs.length} Positions Available
                        </div>
                    </div>

                    <div className="space-y-6">
                        {jobs.map((job, idx) => (
                            <motion.div
                                key={idx}
                                {...fadeIn}
                                className="bg-white p-8 rounded-2xl shadow-sm border border-border hover:shadow-xl hover:border-secondary/30 transition-all group"
                            >
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="flex-1">
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-secondary px-2 py-1 bg-secondary/10 rounded">
                                                {job.department}
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-widest text-primary/60 px-2 py-1 bg-gray-100 rounded">
                                                {job.type}
                                            </span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-primary mb-3 group-hover:text-secondary transition-colors">
                                            {job.title}
                                        </h3>
                                        <p className="text-foreground-muted text-sm leading-relaxed max-w-2xl mb-4">
                                            {job.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-xs font-medium text-foreground-muted">
                                            <div className="flex items-center gap-1.5 capitalize">
                                                <MapPin size={14} className="text-secondary" />
                                                {job.location}
                                            </div>
                                            <div className="flex items-center gap-1.5 capitalize">
                                                <Clock size={14} className="text-secondary" />
                                                Posted recently
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                        <Link
                                            href={`/careers/${job.title.toLowerCase().replace(/ /g, "-")}`}
                                            className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-full group-hover:bg-secondary group-hover:text-primary transition-all"
                                        >
                                            View Details <ArrowRight size={18} />
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* General Application */}
            <section className="py-24 bg-white text-center">
                <div className="container mx-auto px-6 max-w-3xl">
                    <motion.div {...fadeIn}>
                        <div className="w-20 h-20 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mx-auto mb-8">
                            <Briefcase size={36} />
                        </div>
                        <h2 className="text-3xl font-bold text-primary mb-6">Don't see a fit?</h2>
                        <p className="text-lg text-foreground-muted mb-10 leading-relaxed">
                            We're always growing! Send your resume to <span className="text-primary font-bold">info@navagathatech.com</span> and we'll keep you in mind for future opportunities.
                        </p>
                        <Link
                            href="/careers/apply"
                            className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                        >
                            Apply for General Vacancy
                        </Link>
                    </motion.div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
