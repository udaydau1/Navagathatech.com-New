import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ClientMotionWrapper } from "@/components/ClientMotionWrapper";
import {
    Code2,
    Cpu,
    Database,
    Globe,
    Layers,
    Layout,
    Server,
    ShieldCheck,
    Smartphone,
    Zap,
    Cloud,
    Settings,
    Search,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import Link from "next/link";

const domains = [
    {
        title: "Enterprise Systems",
        icon: Server,
        desc: "Unifying global operations with robust enterprise cores and specialized business logic.",
        techs: ["SAP S/4HANA", "SAP ECC", "ABAP Development", "Custom ERP Solutions", "Enterprise Integration"]
    },
    {
        title: "Digital Transformation",
        icon: Zap,
        desc: "Strategic modernization of legacy landscapes and adoption of high-velocity delivery models.",
        techs: ["AS400 Modernization", "Mainframe Transition", "Legacy Refactoring", "Microservices Architecture", "API Strategy"]
    },
    {
        title: "Software Innovation",
        icon: Code2,
        desc: "Building next-generation applications with cutting-edge tech stacks and creative design.",
        techs: ["Next.js/React", "Go Language", "Node.js", "Flutter Mobile", "Python/AI Integrations"]
    },
    {
        title: "Cloud & Reliability",
        icon: Cloud,
        desc: "Scalable infrastructure and automated operations for maximum uptime and developer speed.",
        techs: ["AWS/Azure/GCP", "Kubernetes (K8s)", "Terraform (IaC)", "CI/CD Pipelines", "SRE & Monitoring"]
    }
];

const technologies = [
    { category: "Web & UI", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vue.js"] },
    { category: "Backend & Core", items: ["Node.js", "Go", "Python", "Java", "C# .NET"] },
    { category: "Databases", items: ["PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "SQL Server"] },
    { category: "Legacy & Specialized", items: ["AS400/RPG", "Mainframe/COBOL", "SAP ABAP", "Delphi", "VB6 Modernization"] },
    { category: "Infrastructure", items: ["Docker", "Kubernetes", "AWS Lambda", "Azure Functions", "Jenkins"] }
];

export const metadata = {
    title: "Our Expertise | Navagatha Tech",
    description: "Explore our deep expertise across software technologies, platforms and domains. From legacy AS400 to modern AI and Cloud architectures.",
};

export default function ExpertisePage() {
    return (
        <div className="min-h-screen bg-background font-sans">
            <Header />

            <main className="pt-40 pb-20">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="mb-12">
                        <Breadcrumbs
                            items={[
                                { name: "Our Expertise", url: "https://www.navagathatech.com/expertise" }
                            ]}
                        />
                    </div>

                    <div className="text-center mb-24 max-w-4xl mx-auto">
                        <ClientMotionWrapper
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <h1 className="text-4xl md:text-7xl font-extrabold text-primary mb-8 leading-tight">
                                Deep Expertise <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Across the Spectrum</span>
                            </h1>
                            <p className="text-lg md:text-xl text-foreground-muted leading-relaxed">
                                We bring together the precision of legacy systems and the speed of modern innovation. Our deep domain knowledge across manufacturing, logistics, retail and fintech ensures your technology is a strategic asset.
                            </p>
                        </ClientMotionWrapper>
                    </div>

                    {/* Domain Expertise */}
                    <section className="mb-32">
                        <div className="grid md:grid-cols-2 gap-8">
                            {domains.map((domain, idx) => (
                                <ClientMotionWrapper
                                    key={idx}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-white p-10 rounded-[40px] shadow-xl border border-gray-100 hover:shadow-2xl transition-all group"
                                >
                                    <div className="flex items-start gap-6 mb-8">
                                        <div className="w-16 h-16 bg-primary/5 text-primary rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors">
                                            <domain.icon size={32} />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-primary mb-2">{domain.title}</h3>
                                            <p className="text-foreground-muted">{domain.desc}</p>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {domain.techs.map((tech) => (
                                            <span key={tech} className="px-3 py-1 bg-gray-50 text-primary/70 rounded-full text-xs font-bold border border-gray-100 uppercase tracking-wider">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </ClientMotionWrapper>
                            ))}
                        </div>
                    </section>

                    {/* Tech Stack Grid */}
                    <section className="py-24 bg-primary text-white rounded-[60px] relative overflow-hidden mb-32">
                        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
                        <div className="container px-12 relative z-10">
                            <div className="max-w-3xl mb-16">
                                <h2 className="text-3xl md:text-5xl font-bold mb-6">Our Technology DNA</h2>
                                <p className="text-lg opacity-70">
                                    We maintain active proficiency in a wide array of platforms and languages, ensuring we always pick the right tool for your specific challenge.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-5 gap-12">
                                {technologies.map((techSet, idx) => (
                                    <div key={idx} className="space-y-6">
                                        <h4 className="text-secondary font-bold uppercase tracking-widest text-xs border-b border-white/10 pb-4">
                                            {techSet.category}
                                        </h4>
                                        <ul className="space-y-3">
                                            {techSet.items.map((tech) => (
                                                <li key={tech} className="flex items-center gap-2 text-sm font-medium opacity-80 hover:opacity-100 transition-opacity">
                                                    <CheckCircle2 size={14} className="text-secondary" />
                                                    {tech}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* Call to Action */}
                    <ClientMotionWrapper
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <h3 className="text-3xl font-bold text-primary mb-8">Ready to see our expertise in action?</h3>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link
                                href="/case-studies"
                                className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 flex items-center gap-2"
                            >
                                Browse Case Studies <ArrowRight size={20} />
                            </Link>
                            <Link
                                href="/contact"
                                className="px-10 py-5 bg-white text-primary border border-primary/10 font-bold rounded-full hover:border-primary/30 transition-all flex items-center gap-2"
                            >
                                Let&apos;s Discuss Your Project
                            </Link>
                        </div>
                    </ClientMotionWrapper>
                </div>
            </main>

            <Footer />
        </div>
    );
}
