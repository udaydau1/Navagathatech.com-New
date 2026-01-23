"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/#about" },
    { name: "Capabilities", href: "/#capabilities" },
    { name: "Expertise", href: "/#expertise" },
    { name: "Careers", href: "/careers" },
];

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);

    useEffect(() => {
        // Fetch session
        fetch("/api/auth/session")
            .then(res => res.json())
            .then(data => setUserEmail(data.email))
            .catch(() => { });

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);

        // Lock scroll when mobile menu is open
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            window.removeEventListener("scroll", handleScroll);
            document.body.style.overflow = 'unset';
        };
    }, [mobileMenuOpen]);

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white",
                isScrolled ? "shadow-md py-2 border-b border-gray-100" : "py-4"
            )}
        >
            <div className="container mx-auto px-6 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2 group relative z-[60]">
                    <div className="relative h-10 md:h-14 w-[180px] md:w-[380px] transition-all">
                        <Image
                            src="/images/logo_navagatha.png"
                            alt="Navagatha Tech"
                            fill
                            className="object-contain object-left"
                            priority
                        />
                    </div>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-8">
                    {navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className="text-sm font-medium text-foreground-muted hover:text-primary transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-[2px] after:bg-secondary after:transition-all hover:after:w-full"
                        >
                            {item.name}
                        </Link>
                    ))}

                    {userEmail ? (
                        <Link
                            href={userEmail === "hr@navagathatech.com" ? "/admin" : "#"}
                            className="flex items-center gap-2 text-sm font-bold text-primary px-4 py-2 bg-primary/5 border border-primary/10 rounded-full hover:bg-secondary hover:text-primary transition-all transition-colors"
                        >
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            {userEmail === "hr@navagathatech.com" ? "Admin Panel" : userEmail.split("@")[0]}
                        </Link>
                    ) : (
                        <Link
                            href="/login"
                            className="text-sm font-bold text-primary/60 hover:text-primary transition-all px-3 py-1.5 rounded-lg hover:bg-primary/5"
                        >
                            Login
                        </Link>
                    )}

                    <Link
                        href="/contact"
                        className="px-5 py-2.5 bg-primary text-white text-sm font-semibold rounded-full hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-95"
                    >
                        Contact Us
                    </Link>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden p-2 text-primary relative z-[60] hover:bg-primary/5 rounded-lg transition-colors"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Premium Mobile Menu Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: "100%" }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-50 bg-white md:hidden pt-24 pb-10 px-6 flex flex-col h-screen"
                    >
                        <div className="flex flex-col gap-2 mt-8">
                            {navigation.map((item, idx) => (
                                <motion.div
                                    key={item.name}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + idx * 0.05 }}
                                >
                                    <Link
                                        href={item.href}
                                        className="text-3xl font-bold text-primary py-4 block border-b border-gray-50 flex items-center justify-between group"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.name}
                                        <ArrowRight size={24} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + navigation.length * 0.05 }}
                            >
                                <Link
                                    href={userEmail ? (userEmail === "hr@navagathatech.com" ? "/admin" : "#") : "/login"}
                                    className="text-3xl font-bold text-secondary py-4 block border-b border-gray-50 flex items-center justify-between group"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    {userEmail ? (userEmail === "hr@navagathatech.com" ? "Admin Dashboard" : userEmail.split("@")[0]) : "Employee Login"}
                                    <ArrowRight size={24} className="text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-auto"
                        >
                            <Link
                                href="/contact"
                                className="w-full text-center px-8 py-5 bg-primary text-white text-xl font-bold rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-primary/20"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                Contact Us <ArrowRight size={20} />
                            </Link>

                            <div className="mt-8 text-center text-gray-400 text-sm">
                                <p>© 2026 Navagatha Tech Pvt. Ltd.</p>
                                <p>Andheri (W), Mumbai</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
