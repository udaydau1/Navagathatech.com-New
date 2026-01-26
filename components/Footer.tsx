import Link from "next/link";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-primary text-white py-12 md:py-16">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-12">
                    <div className="flex flex-col gap-6">
                        <div className="relative h-14 w-full">
                            <Image
                                src="/images/logo_footer_v3.png"
                                alt="Navagatha Tech"
                                fill
                                className="object-contain object-left"
                            />
                        </div>
                        <p className="text-gray-300 text-sm leading-relaxed max-w-xs">
                            We empower businesses through technology innovation, reliable delivery, and strategic partnership. Building future-ready landscapes.
                        </p>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-semibold text-secondary">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
                            <li><a href="/#vision" className="hover:text-white transition-colors">Our Vision</a></li>
                            <li><Link href="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
                            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-semibold text-secondary">Capabilities</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li><a href="/#capabilities" className="hover:text-white transition-colors">App Development</a></li>
                            <li><a href="/#capabilities" className="hover:text-white transition-colors">IT Transformation</a></li>
                            <li><a href="/#capabilities" className="hover:text-white transition-colors">Maintenance & Support</a></li>
                            <li><a href="/#capabilities" className="hover:text-white transition-colors">Database Expertise</a></li>
                        </ul>
                    </div>

                    <div className="flex flex-col gap-6">
                        <h3 className="text-lg font-semibold text-secondary">Contact</h3>
                        <ul className="space-y-3 text-sm text-gray-300">
                            <li>
                                <p className="font-medium text-white mb-1">Office Address:</p>
                                <p className="text-xs leading-relaxed opacity-80">
                                    Office 112, A wing, Crystal Plaza, New Link Rd, <br />
                                    Andheri (W), Mumbai 400053, India
                                </p>
                            </li>
                            <li><Link href="/contact" className="hover:text-white transition-colors font-medium">Contact Us Form</Link></li>
                            <li><a href="tel:+912245705334" className="hover:text-white transition-colors font-medium">+91 22 45705334</a></li>
                            <li><a href="mailto:info@navagathatech.com" className="hover:text-white transition-colors font-medium">info@navagathatech.com</a></li>
                        </ul>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Navagatha Tech Pvt. Ltd. All rights reserved.</p>
                    <div className="flex gap-4">
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                        <a href="#" className="hover:text-white">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
