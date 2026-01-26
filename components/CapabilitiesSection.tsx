"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Database, Layers, MonitorSmartphone, Server, ShieldCheck, Zap, Globe, Cpu, Cloud, Code2, ArrowRight, type LucideIcon } from "lucide-react";

type ServiceCardColor = "primary" | "secondary" | "accent";

type ServiceCardProps = {
    icon: LucideIcon;
    title: string;
    desc: string;
    color: ServiceCardColor;
    points: string[];
    link?: string;
};

const colorMap: Record<ServiceCardColor, string> = {
    primary: "border-primary text-primary bg-primary/5",
    secondary: "border-secondary text-secondary bg-secondary/5",
    accent: "border-accent text-accent bg-accent/5",
};

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
};

const ServiceCard = ({ icon: Icon, title, desc, color, points, link }: ServiceCardProps) => {
    return (
        <motion.div
            whileHover={{ y: -10, scale: 1.02 }}
            className={`bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all border-b-8 ${colorMap[color].split(' ')[0]}`}
        >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${colorMap[color].split(' ').slice(1).join(' ')}`}>
                <Icon size={30} />
            </div>
            <h3 className="text-2xl font-bold text-primary mb-4">{title}</h3>
            <p className="text-foreground-muted mb-6 leading-relaxed">
                {desc}
            </p>
            <ul className="space-y-2 mb-8">
                {points.map((point: string, idx: number) => (
                    <li key={idx} className="flex items-center gap-2 text-sm font-medium text-primary/80">
                        <CheckCircle2 size={14} className="text-secondary" />
                        {point}
                    </li>
                ))}
            </ul>

            {link && (
                <div className="mt-auto border-t border-gray-50 pt-6">
                    <a
                        href={link}
                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:text-secondary transition-colors group/link"
                    >
                        Explore Case Study
                        <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform text-secondary" />
                    </a>
                </div>
            )}
        </motion.div>
    );
};

export function CapabilitiesSection() {
    const [activeTab, setActiveTab] = useState('software');

    return (
        <section id="capabilities" className="py-24 bg-background">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.div {...fadeIn}>
                        <h2 className="text-secondary font-bold tracking-widest uppercase mb-2">Our Capabilities</h2>
                        <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">Expertise That Scales</h3>
                        <p className="text-lg text-foreground-muted max-w-3xl mx-auto leading-relaxed">
                            We bridge the gap between legacy reliability and modern innovation, delivering solutions that are both robust and future-ready.
                        </p>
                    </motion.div>
                </div>

                {/* Navigation Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-16">
                    {[
                        { id: 'software', label: 'Software Dev', icon: Code2 },
                        { id: 'transformation', label: 'IT Transformation', icon: Layers },
                        { id: 'data', label: 'Data & AI', icon: Database },
                        { id: 'infrastructure', label: 'Cloud & Infrastructure', icon: Cloud }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${activeTab === tab.id
                                ? 'bg-primary text-white shadow-xl scale-105'
                                : 'bg-white text-primary border border-primary/10 hover:border-primary/30'
                                }`}
                        >
                            <tab.icon size={18} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {activeTab === 'software' && (
                        <>
                            <ServiceCard
                                icon={MonitorSmartphone}
                                title="Web & Mobile Development"
                                desc="Custom digital experiences built with performance, security and scalability in mind."
                                color="primary"
                                points={["Full-stack Next.js/React", "Cross-platform Mobile", "API Integration", "Progressive Web Apps"]}
                                link="/case-studies/next-gen-mobile-retail"
                            />
                            <ServiceCard
                                icon={Code2}
                                title="Application Modernization"
                                desc="Revitalizing aging systems with modern architectures without compromising business logic."
                                color="secondary"
                                points={["Monolith to Microservices", "UI/UX Refresh", "Code Refactoring", "Tech Stack Migration"]}
                            />
                            <ServiceCard
                                icon={ShieldCheck}
                                title="Quality Engineering"
                                desc="Comprehensive testing strategies to ensure zero-defect delivery and high performance."
                                color="accent"
                                points={["Automated Testing", "Performance Tuning", "Security Audits", "Continuous QA"]}
                            />
                        </>
                    )}

                    {activeTab === 'transformation' && (
                        <>
                            <ServiceCard
                                icon={Server}
                                title="Legacy Transformation"
                                desc="Deep expertise in AS400, Mainframe, and legacy system modernization workflows."
                                color="primary"
                                points={["AS400 Modernization", "Mainframe Transition", "Impact Analysis", "Risk Mitigation"]}
                                link="/case-studies/as400-modernization-logistics"
                            />
                            <ServiceCard
                                icon={Layers}
                                title="Digital Strategy"
                                desc="Aligning technology roadmaps with core business objectives for measurable outcomes."
                                color="secondary"
                                points={["IT Consulting", "Roadmap Planning", "Process Automation", "ROI Optimization"]}
                            />
                            <ServiceCard
                                icon={Zap}
                                title="Agile Enablement"
                                desc="Helping organizations adopt modern delivery practices for faster time-to-market."
                                color="accent"
                                points={["DevOps Culture", "Scrum Implementation", "CI/CD Pipelines", "Product Thinking"]}
                            />
                        </>
                    )}

                    {activeTab === 'data' && (
                        <>
                            <ServiceCard
                                icon={Database}
                                title="Data Engineering"
                                desc="Unlocking the power of your business data with modern warehousing and pipelines."
                                color="primary"
                                points={["Data Warehousing", "ETL Pipelines", "Data Lake Setup", "Governance & Quality"]}
                            />
                            <ServiceCard
                                icon={Cpu}
                                title="AI & Machine Learning"
                                desc="Practical AI implementation to automate complex decisions and enhance user value."
                                color="secondary"
                                points={["Predictive Analytics", "NLP Solutions", "ML model deployment", "Computer Vision"]}
                                link="/case-studies/ai-analytics-healthcare"
                            />
                            <ServiceCard
                                icon={Globe}
                                title="Business Intelligence"
                                desc="Turning raw data into intuitive visual insights and real-time decision support."
                                color="accent"
                                points={["Real-time Dashboards", "Strategic Reporting", "Trend Analysis", "Data Visualization"]}
                            />
                        </>
                    )}

                    {activeTab === 'infrastructure' && (
                        <>
                            <ServiceCard
                                icon={Cloud}
                                title="Cloud Migration"
                                desc="Seamless transition of enterprise workloads to AWS, Azure, or Google Cloud."
                                color="primary"
                                points={["AWS/Azure/GCP", "Cloud-Native Strategy", "Migration Planning", "Post-Cloud Support"]}
                            />
                            <ServiceCard
                                icon={Zap}
                                title="DevOps & SRE"
                                desc="Ensuring maximum uptime and developer productivity through automation and observability."
                                color="secondary"
                                points={["IaC (Terraform/CDK)", "Kubernetes (K8s)", "Monitoring & Logging", "Incident Response"]}
                            />
                            <ServiceCard
                                icon={ShieldCheck}
                                title="Cyber Security"
                                desc="Enterprise-grade protection for your digital assets and customer data privacy."
                                color="accent"
                                points={["Vulnerability Assessment", "Cloud Security", "Identity Management", "Compliance"]}
                            />
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
