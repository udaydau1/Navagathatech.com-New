"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, ShieldCheck, ArrowRight, Loader2, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [step, setStep] = useState(1); // 1: Email, 2: OTP
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!email.endsWith("@navagathatech.com")) {
            setError("Please use your official @navagathatech.com email.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (res.ok) {
                setStep(2);
            } else {
                setError(data.message || "Failed to send OTP.");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/verify", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, code: otp }),
            });

            const data = await res.json();
            if (res.ok) {
                router.push(email === "hr@navagathatech.com" ? "/admin" : "/");
                router.refresh();
            } else {
                setError(data.message || "Invalid OTP.");
            }
        } catch (err) {
            setError("Failed to verify. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans flex flex-col">
            <Header />

            <main className="flex-grow flex items-center justify-center pt-32 pb-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white p-8 md:p-10 rounded-[40px] shadow-2xl shadow-primary/5 border border-gray-100">
                        <div className="text-center mb-10">
                            <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                                <ShieldCheck size={32} />
                            </div>
                            <h1 className="text-3xl font-bold text-primary mb-2">Employee Login</h1>
                            <p className="text-foreground-muted">Secure access for Navagatha team</p>
                        </div>

                        <AnimatePresence mode="wait">
                            {step === 1 ? (
                                <motion.form
                                    key="email-step"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    onSubmit={handleSendOtp}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2">
                                        <label className="text-sm font-bold text-primary px-1">Official Email ID</label>
                                        <div className="relative">
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                                            <input
                                                type="email"
                                                required
                                                placeholder="yourname@navagathatech.com"
                                                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        disabled={loading}
                                        className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 disabled:opacity-70"
                                    >
                                        {loading ? <Loader2 className="animate-spin" size={20} /> : "Send OTP"}
                                        {!loading && <ArrowRight size={20} />}
                                    </button>
                                </motion.form>
                            ) : (
                                <motion.form
                                    key="otp-step"
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    onSubmit={handleVerifyOtp}
                                    className="space-y-6"
                                >
                                    <div className="space-y-2 text-center">
                                        <label className="text-sm font-bold text-primary">Enter the 6-digit code sent to</label>
                                        <p className="text-sm text-secondary font-semibold">{email}</p>
                                        <input
                                            type="text"
                                            required
                                            maxLength={6}
                                            placeholder="· · · · · ·"
                                            className="w-full text-center text-3xl font-bold tracking-[1em] py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-secondary/20 focus:border-secondary outline-none transition-all placeholder:tracking-normal placeholder:text-gray-300"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                                        />
                                    </div>

                                    {error && (
                                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 p-3 rounded-xl border border-red-100">
                                            <AlertCircle size={16} />
                                            {error}
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <button
                                            disabled={loading}
                                            className="w-full py-4 bg-primary text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-primary/95 transition-all shadow-xl shadow-primary/20 disabled:opacity-70"
                                        >
                                            {loading ? <Loader2 className="animate-spin" size={20} /> : "Verify & Login"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setStep(1)}
                                            className="w-full text-center text-sm font-semibold text-primary/60 hover:text-primary transition-colors"
                                        >
                                            Change Email
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
