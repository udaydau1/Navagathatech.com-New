"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Mail, Phone, MapPin, Send, CheckCircle2, ChevronRight, Briefcase, TrendingUp, Mic2, type LucideIcon } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

// ... inquiryTypes and other types remain same ...

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
                // Reset form but keep name/email if they want to send another (optional)
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

    export default function ContactPage() {
        return (
            <div className="min-h-screen bg-white text-[#1A1A1A] font-sans">
                <Header />

                <main className="pt-24 pb-20">
                    {/* Hero Head */}
                    <div className="bg-[#F8FAFC] py-20 border-b border-gray-100">
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

                            {/* Note: Inquiry selection buttons remain, but they affect the form state inside Suspense below if needed. 
                            For simplicity, we'll keep the logic inside the ContactForm component.
                        */}
                        </div>
                    </div>

                    <div className="container mx-auto px-6 max-w-6xl mt-20">
                        <Suspense fallback={<div className="min-h-[600px] flex items-center justify-center">Loading form...</div>}>
                            <ContactForm />
                        </Suspense>
                    </div>
                </main>

                <Footer />
            </div>
        );
    }
}
