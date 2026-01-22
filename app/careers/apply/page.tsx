"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Send, Upload, FileText, CheckCircle2, ChevronLeft, MapPin, Briefcase } from "lucide-react";
import Link from "next/link";

const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
};

function ApplicationForm() {
    const searchParams = useSearchParams();
    const jobTitle = searchParams.get("job") || "General Application";

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        experience: "",
        message: ""
    });

    const [file, setFile] = useState<File | null>(null);
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
    const [errorMessage, setErrorMessage] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const selectedFile = e.target.files[0];
            if (selectedFile.size > 5 * 1024 * 1024) { // 5MB limit
                alert("File size should be less than 5MB");
                return;
            }
            setFile(selectedFile);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) {
            alert("Please upload your CV/Resume");
            return;
        }

        setStatus("submitting");
        setErrorMessage("");

        try {
            const data = new FormData();
            data.append("name", formData.name);
            data.append("email", formData.email);
            data.append("phone", formData.phone);
            data.append("experience", formData.experience);
            data.append("message", formData.message);
            data.append("jobTitle", jobTitle);
            data.append("resume", file);

            const response = await fetch("/api/apply", {
                method: "POST",
                body: data,
            });

            const result = await response.json();

            if (response.ok && result.success) {
                setStatus("success");
            } else {
                setErrorMessage(result.message || "Something went wrong. Please try again.");
                setStatus("error");
            }
        } catch (error) {
            console.error("Application Error:", error);
            setErrorMessage("Failed to submit. Please check your connection.");
            setStatus("error");
        }
    };

    if (status === "success") {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-12 md:p-16 rounded-[40px] shadow-2xl text-center max-w-2xl mx-auto"
            >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-8 border border-green-100">
                    <CheckCircle2 size={40} className="animate-bounce" />
                </div>
                <h2 className="text-3xl font-bold text-primary mb-4">Application Received!</h2>
                <p className="text-gray-500 mb-10 leading-relaxed text-lg">
                    Thank you for applying for the <strong>{jobTitle}</strong> position. Our HR team will review your CV and get back to you shortly at <strong>{formData.email}</strong>.
                </p>
                <Link
                    href="/careers"
                    className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20"
                >
                    Back to Careers
                </Link>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white p-8 md:p-14 rounded-[40px] shadow-2xl border border-gray-100 max-w-3xl mx-auto"
        >
            <div className="mb-10">
                <Link href="/careers" className="inline-flex items-center gap-2 text-primary/60 hover:text-primary mb-6 transition-colors font-semibold">
                    <ChevronLeft size={18} /> Back to Careers
                </Link>
                <h2 className="text-3xl font-bold text-primary mb-3">Apply for {jobTitle}</h2>
                <p className="text-gray-500">Provide your professional details and upload your latest CV.</p>
            </div>

            {status === "error" && (
                <div className="mb-8 p-5 bg-red-50 text-red-600 rounded-2xl text-sm font-bold border border-red-100 italic">
                    {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Full Name *</label>
                        <input
                            type="text" required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all"
                            placeholder="John Doe"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Work Email *</label>
                        <input
                            type="email" required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all"
                            placeholder="john@company.com"
                        />
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Phone Number *</label>
                        <input
                            type="tel" required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all"
                            placeholder="+91 00000 00000"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Years of Exp. *</label>
                        <input
                            type="text" required
                            value={formData.experience}
                            onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                            className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all"
                            placeholder="e.g. 5 Years"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">CV / Resume (PDF/DOC) *</label>
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className={`cursor-pointer w-full p-8 border-2 border-dashed rounded-3xl flex flex-col items-center justify-center transition-all ${file ? 'border-primary bg-primary/5' : 'border-gray-200 bg-gray-50 hover:border-primary/50'}`}
                    >
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept=".pdf,.doc,.docx"
                            className="hidden"
                        />
                        {file ? (
                            <div className="flex items-center gap-3 text-primary font-bold">
                                <FileText size={32} />
                                <div className="text-left">
                                    <p className="text-sm line-clamp-1">{file.name}</p>
                                    <p className="text-[10px] opacity-60">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                <Upload size={32} className="text-primary/40 mb-3" />
                                <p className="font-bold text-primary/60">Upload CV</p>
                                <p className="text-xs text-gray-400 mt-1">Accepts PDF, DOCX (Max 5MB)</p>
                            </>
                        )}
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold text-primary uppercase tracking-widest pl-1">Anything else?</label>
                    <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:bg-white focus:border-primary/20 outline-none transition-all resize-none"
                        placeholder="Tell us why you're a good fit..."
                    />
                </div>

                <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full py-5 bg-primary text-white font-extrabold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                >
                    {status === "submitting" ? (
                        <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            SUBMIT APPLICATION <Send size={20} />
                        </>
                    )}
                </button>
            </form>
        </motion.div>
    );
}

export default function ApplyPage() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />
            <section className="pt-40 pb-20">
                <div className="container mx-auto px-6">
                    <Suspense fallback={<div className="text-center py-20 font-bold">Loading application form...</div>}>
                        <ApplicationForm />
                    </Suspense>
                </div>
            </section>
            <Footer />
        </div>
    );
}
