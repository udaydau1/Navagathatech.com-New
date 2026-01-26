"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, Briefcase, TrendingUp, Mic2, type LucideIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { getContactPageSchema } from "@/lib/schema";

type InquiryTypeId = "services" | "investor" | "media";

type InquiryType = {
    id: InquiryTypeId;
    label: string;
    icon: LucideIcon;
};

type ContactFormData = {
    name: string;
    email: string;
    company: string;
    subject: string;
    message: string;
    country: string;
};

const inquiryTypes: InquiryType[] = [
    { id: 'services', label: 'Request for Services', icon: Briefcase },
    { id: 'investor', label: 'Investor Information', icon: TrendingUp },
    { id: 'media', label: 'Media Contacts', icon: Mic2 },
];

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8 }
};

function ContactForm() {
    const searchParams = useSearchParams();
    const subjectParam = searchParams.get("subject");

    const [selectedType, setSelectedType] = useState<InquiryTypeId>("services");
    const [formData, setFormData] = useState<ContactFormData>({
        name: "",
        email: "",
        company: "",
        subject: "Request for Services",
        message: "",
        country: "India"
    });

    useEffect(() => {
        if (subjectParam) {
            setFormData(prev => ({
                ...prev,
                subject: subjectParam,
                message: `Hi Navagatha Team,\n\nI am writing to express my interest in the ${subjectParam} position. [Please attach details/resume link here]`
            }));
        }
    }, [subjectParam]);

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleTypeChange = (type: InquiryTypeId, label: string) => {
        setSelectedType(type);
        setFormData({ ...formData, subject: label });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("submitting");
        setErrorMessage("");

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...formData, inquiryType: selectedType })
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus("success");
                setFormData({ name: "", email: "", company: "", subject: formData.subject, message: "", country: "India" });
            } else {
                setErrorMessage(result.message || "An unexpected error occurred.");
                setStatus("error");
            }
        } catch (error) {
            console.error("Submission Error:", error);
            setErrorMessage("Failed to connect to the server. Please check your internet and try again.");
            setStatus("error");
        }
    };

    return (
        <div className="grid lg:grid-cols-12 gap-16">
            {/* Address & Info Panel */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="lg:col-span-4 space-y-10"
            >
                <div>
                    <h3 className="text-sm font-bold text-secondary uppercase tracking-[0.2em] mb-6">Registered Office</h3>
                    <div className="flex gap-4">
                        <div className="p-2.5 bg-primary/5 rounded-lg h-fit text-primary">
                            <MapPin size={24} />
                        </div>
                        <div className="text-gray-700 leading-relaxed text-lg">
                            <p className="font-bold text-primary mb-2">Navagatha Tech Pvt. Ltd.</p>
                            <p>Office No. 112, A wing, 1st floor,</p>
                            <p>Crystal plaza premises co - operative society ltd.</p>
                            <p>New link road, Opposite infinity mall</p>
                            <p>Andheri (west) Mumbai 400053 India.</p>
                        </div>
                    </div>
                </div>

                <div className="p-1 w-full bg-gradient-to-r from-gray-100 to-transparent my-10" />

                <div className="space-y-8">
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="p-4 bg-primary rounded-xl text-white group-hover:bg-secondary transition-colors">
                            <Mail size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Mail us at</p>
                            <p className="text-xl font-bold text-primary">info@navagathatech.com</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-4 group cursor-pointer">
                        <div className="p-4 bg-primary/5 rounded-xl text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <Phone size={24} />
                        </div>
                        <div>
                            <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">Business Support</p>
                            <p className="text-xl font-bold text-primary">+91 22 45705334</p>
                        </div>
                    </div>
                </div>

                <div className="bg-primary/5 p-8 rounded-3xl border border-primary/5">
                    <h4 className="font-bold text-primary mb-3">Response Promise</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        We aim to process all enterprise inquiries within one business day. Our global network ensures support across all time zones.
                    </p>
                </div>
            </motion.div>

            {/* Dynamic Form Area */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="lg:col-span-8"
            >
                {/* Inquiry Selection Boxes (Only shown if NOT a job application) */}
                {!subjectParam && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        {inquiryTypes.map((type) => (
                            <button
                                key={type.id}
                                onClick={() => handleTypeChange(type.id, type.label)}
                                className={`group flex flex-col items-center justify-center p-8 rounded-2xl border-2 transition-all duration-500 ${selectedType === type.id
                                    ? 'border-primary bg-primary text-white shadow-2xl scale-[1.03]'
                                    : 'border-gray-200 bg-white hover:border-primary/30 hover:shadow-xl'
                                    }`}
                            >
                                <div className={`p-4 rounded-xl mb-4 transition-colors ${selectedType === type.id ? 'bg-white/10' : 'bg-primary/5 group-hover:bg-primary/10'
                                    }`}>
                                    <type.icon size={24} className={selectedType === type.id ? 'text-secondary' : 'text-primary'} />
                                </div>
                                <span className="text-sm font-bold tracking-tight">{type.label}</span>
                            </button>
                        ))}
                    </div>
                )}

                <AnimatePresence mode="wait">
                    {status === "success" ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            className="bg-white p-16 rounded-[40px] shadow-2xl border border-primary/5 text-center flex flex-col items-center justify-center min-h-[600px]"
                        >
                            <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-8 border border-green-100">
                                <CheckCircle2 size={48} className="animate-bounce" />
                            </div>
                            <h2 className="text-4xl font-bold text-primary mb-4">Submission Successful</h2>
                            <p className="text-xl text-gray-500 mb-10 max-w-md">
                                Your request regarding <strong>{formData.subject}</strong> has been logged. We&apos;ll be in touch with you shortly.
                            </p>
                            <button
                                onClick={() => setStatus("idle")}
                                className="px-12 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all flex items-center gap-3 group"
                            >
                                Send another inquiry
                                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-10 md:p-14 rounded-[40px] shadow-2xl border border-gray-100"
                        >
                            <div className="mb-10">
                                <h3 className="text-2xl font-bold text-primary mb-2">
                                    {subjectParam ? "Submit Application" : "Connect with our team"}
                                </h3>
                                <p className="text-gray-500">Provide your details below and we will get back to you.</p>
                            </div>

                            {status === "error" && (
                                <div className="mb-8 p-5 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 flex gap-3 items-center">
                                    <div className="w-2 h-2 rounded-full bg-red-600 animate-ping" />
                                    {errorMessage || "Error processing request. Please try again or email info@navagathatech.com"}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-8">
                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="relative">
                                        <input
                                            type="text" required
                                            placeholder=" "
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="peer w-full pt-8 pb-3 bg-transparent border-b-2 border-gray-100 focus:border-primary transition-all outline-none text-lg font-medium"
                                        />
                                        <label className="absolute left-0 top-0 text-sm font-bold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-primary">Full Name *</label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="email" required
                                            placeholder=" "
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="peer w-full pt-8 pb-3 bg-transparent border-b-2 border-gray-100 focus:border-primary transition-all outline-none text-lg font-medium"
                                        />
                                        <label className="absolute left-0 top-0 text-sm font-bold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-primary">Work Email *</label>
                                    </div>
                                </div>

                                <div className="grid md:grid-cols-2 gap-8">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder=" "
                                            value={formData.company}
                                            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                                            className="peer w-full pt-8 pb-3 bg-transparent border-b-2 border-gray-100 focus:border-primary transition-all outline-none text-lg font-medium"
                                        />
                                        <label className="absolute left-0 top-0 text-sm font-bold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-primary">Company / Organization</label>
                                    </div>
                                    <div className="relative">
                                        <input
                                            type="text" required
                                            placeholder=" "
                                            value={formData.country}
                                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                            className="peer w-full pt-8 pb-3 bg-transparent border-b-2 border-gray-100 focus:border-primary transition-all outline-none text-lg font-medium"
                                        />
                                        <label className="absolute left-0 top-0 text-sm font-bold text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:top-8 peer-placeholder-shown:text-gray-300 peer-focus:top-0 peer-focus:text-primary">Country / Region *</label>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Inquiry Message *</label>
                                    <textarea
                                        required rows={4}
                                        placeholder="Briefly describe what you&apos;re looking for..."
                                        value={formData.message}
                                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                        className="w-full p-6 bg-gray-50 border-2 border-gray-50 rounded-[24px] focus:bg-white focus:border-primary/20 transition-all outline-none text-lg resize-none"
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row items-center gap-8 pt-6">
                                    <button
                                        type="submit"
                                        disabled={status === "submitting"}
                                        className="w-full md:w-fit px-12 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/10 flex items-center justify-center gap-4 disabled:opacity-70 disabled:cursor-not-allowed group"
                                    >
                                        {status === "submitting" ? (
                                            <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                SUBMIT REQUEST
                                                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
                                        By submitting this form, you agree to our privacy policy and our team reaching out to you.
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export function ContactPageContent() {
    const contactSchema = getContactPageSchema();

    return (
        <main className="pt-24 pb-20">
            {/* ContactPage Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
            />

            <Header />

            {/* Breadcrumbs */}
            <div className="container mx-auto px-6 max-w-6xl pt-6">
                <Breadcrumbs
                    items={[
                        { name: "Contact", url: "https://www.navagathatech.com/contact" }
                    ]}
                />
            </div>

            {/* Hero Head */}
            <div className="bg-[#F8FAFC] py-20 border-b border-gray-100 mt-6">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="max-w-2xl"
                        >
                            <h1 className="text-5xl md:text-7xl font-light text-primary mb-6 leading-tight">
                                What&apos;s on <br />
                                <span className="font-bold">your mind?</span>
                            </h1>
                            <p className="text-xl text-gray-600 leading-relaxed">
                                We&apos;re here to help! Tell us what you&apos;re looking for and we&apos;ll get you connected to the right people.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="hidden md:block w-72 h-72 relative"
                        >
                            <div className="absolute inset-0 bg-primary/5 rounded-full blur-3xl animate-pulse" />
                            <div className="relative z-10 w-full h-full border-[12px] border-secondary/20 rounded-full flex items-center justify-center p-8">
                                <Mail className="w-32 h-32 text-primary/10" />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-6xl mt-20">
                <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center text-primary font-bold">Loading form...</div>}>
                    <ContactForm />
                </Suspense>
            </div>

            <Footer />
        </main>
    );
}
