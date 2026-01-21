"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Database, Layers, MonitorSmartphone, Server, ShieldCheck, Zap, Globe, Cpu, Cloud, Code2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const ServiceCard = ({ icon: Icon, title, desc, color, points }: any) => {
  const colorMap: any = {
    primary: "border-primary text-primary bg-primary/5",
    secondary: "border-secondary text-secondary bg-secondary/5",
    accent: "border-accent text-accent bg-accent/5",
  };

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
      <ul className="space-y-2">
        {points.map((point: string, idx: number) => (
          <li key={idx} className="flex items-center gap-2 text-sm font-medium text-primary/80">
            <CheckCircle2 size={14} className="text-secondary" />
            {point}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('software');

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary selection:text-primary">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-white text-primary">
        {/* Abstract subtle background for light mode */}
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-accent blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] rounded-full bg-secondary blur-[100px]" />
        </div>

        <div className="container relative z-10 px-6 pt-32 text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary/5 text-primary border border-primary/10 text-sm font-bold tracking-wider mb-8">
              NEXT-GENERATION IT SERVICES
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight mb-8">
              Empowering Businesses Through <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-secondary">
                Technology Innovation
              </span>
            </h1>
            <p className="text-lg md:text-xl text-foreground-muted mb-12 max-w-3xl mx-auto leading-relaxed">
              We are your strategic partner in building a future-ready application landscape.
              Modernize, optimize, and innovate with Navagatha Tech.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/contact" className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:-translate-y-1">
                Start Transformation
              </Link>
              <a href="#capabilities" className="px-10 py-5 bg-white border-2 border-primary/10 text-primary font-bold rounded-full hover:bg-primary/5 transition-all hover:-translate-y-1">
                Explore Capabilities
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              {...fadeIn}
              className="relative"
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative shadow-2xl group">
                <Image
                  src="/images/about.png"
                  alt="Navagatha Team Collaboration"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Decorative element */}
                <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border-2 border-secondary/30 rounded-2xl z-[-1]" />
              </div>
            </motion.div>

            <motion.div {...fadeIn}>
              <h2 className="text-secondary font-bold tracking-widest uppercase mb-2">About Us</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Strategic Partner for Future-Ready Landscapes</h3>
              <div className="space-y-6 text-foreground-muted leading-relaxed">
                <p>
                  Navagatha Tech Pvt. Ltd. is a next-generation IT services company driven by a single purpose: to empower businesses through technology innovation and reliable delivery. We are not just another IT vendor; we want to be a strategic partner in building a future-ready application landscape.
                </p>
                <p>
                  Our expertise spans Application Development & Implementation, Maintenance & Support, and Full IT Transformation, enabling organizations to modernize legacy systems, adopt cutting-edge technologies, and achieve operational excellence.
                </p>
                <p>
                  We combine deep technical knowledge with a customer-first approach, ensuring every solution we deliver is secure, scalable, and aligned with our client business goals.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="py-20 bg-primary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-6 relative z-10 text-center max-w-4xl">
          <motion.div {...fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Vision</h2>
            <p className="text-xl md:text-2xl leading-relaxed font-light text-gray-200">
              "To become the most trusted partner for businesses seeking innovation, reliability, and transformation by delivering solutions that not only solve today’s challenges but prepare organizations for tomorrow’s opportunities."
            </p>
            <div className="mt-8 w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Capabilities Section - Dynamic Tabs */}
      <section id="capabilities" className="py-24 bg-background-alt overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-primary text-3xl md:text-5xl font-extrabold mb-6">Our Services & Capabilities</h2>
            <p className="text-foreground-muted max-w-3xl mx-auto text-lg leading-relaxed">
              Offering comprehensive IT-software services across all platforms. We bridge the gap between
              cutting-edge innovation and mission-critical legacy stability.
            </p>
          </div>

          <div className="flex flex-col items-center">
            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-12 p-1.5 bg-gray-100 rounded-2xl w-full max-w-4xl mx-auto shadow-inner">
              {[
                { id: 'software', label: 'Software Services', icon: MonitorSmartphone },
                { id: 'modern', label: 'Modern Tech Stack', icon: Zap },
                { id: 'infra', label: 'Infra & DevOps', icon: Server },
                { id: 'enterprise', label: 'Enterprise Systems', icon: Layers },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold transition-all duration-300 text-sm md:text-base ${activeTab === tab.id
                    ? 'bg-primary text-white shadow-xl scale-105'
                    : 'text-foreground-muted hover:bg-white hover:text-primary'
                    }`}
                >
                  <tab.icon size={18} />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="w-full">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {activeTab === 'software' && (
                  <>
                    <ServiceCard
                      icon={MonitorSmartphone}
                      title="Web & Mobile Development"
                      color="accent"
                      desc="End-to-end development of scalable server-side and client-side web applications. Cross-platform mobile development for iOS and Android reaching global audiences."
                      points={["Progressive Web Apps", "React/Angular/Next.js", "Flutter/React Native"]}
                    />
                    <ServiceCard
                      icon={Zap}
                      title="AI & Machine Learning"
                      color="secondary"
                      desc="Leveraging artificial intelligence to automate complex workflows, predict trends, and deliver intelligent user experiences tailored to your data."
                      points={["Predictive Analytics", "NLP & Chatbots", "Custom ML Models"]}
                    />
                    <ServiceCard
                      icon={Database}
                      title="Data & Analytics"
                      color="primary"
                      desc="Comprehensive data strategy, from warehousing to visualization. Expert management of SQL and NoSQL ecosystems for actionable business insights."
                      points={["Informatica ETL", "Real-time BI", "Database Tuning"]}
                    />
                  </>
                )}

                {activeTab === 'modern' && (
                  <>
                    <ServiceCard
                      icon={Layers}
                      title="Microservices Architecture"
                      color="accent"
                      desc="Decoupling monolithic legacy systems into robust, scalable microservices using modern API-first design principles and high-performance protocols."
                      points={["Event-Driven Design", "API Gateways", "Service Mesh"]}
                    />
                    <ServiceCard
                      icon={CheckCircle2}
                      title="Test Automation"
                      color="secondary"
                      desc="Full-lifecycle quality assurance with automated regression, performance, and security testing integrated directly into your build pipelines."
                      points={["CI/CD Integration", "Performance Testing", "Zero-Bug Policy"]}
                    />
                    <ServiceCard
                      icon={ShieldCheck}
                      title="Cybersecurity"
                      color="primary"
                      desc="Security-first approach to all software applications. Protecting your infrastructure from modern threats with proactive monitoring and encryption."
                      points={["Vulnerability Audit", "Identity Management", "Data Encryption"]}
                    />
                  </>
                )}

                {activeTab === 'infra' && (
                  <>
                    <ServiceCard
                      icon={Server}
                      title="Server & Infrastructure"
                      color="accent"
                      desc="On-premise and cloud server management. High-availability cluster setups, load balancing, and dedicated cloud-native infrastructure solutions."
                      points={["Cloud Migration", "Hybrid Cloud", "HA Environments"]}
                    />
                    <ServiceCard
                      icon={Zap}
                      title="DevOps & GitOps"
                      color="secondary"
                      desc="Eliminating silos between development and operations. Infrastructure as Code (IaC) and automated deployment for rapid, reliable delivery."
                      points={["Docker & Kubernetes", "Terraform/Ansible", "CI/CD Pipelines"]}
                    />
                    <ServiceCard
                      icon={ShieldCheck}
                      title="Monitoring & NOC"
                      color="primary"
                      desc="24/7 infrastructure monitoring and incident response. Ensuring 99.9% uptime for your mission-critical server applications and network."
                      points={["Proactive Alerts", "Log Aggregation", "Disaster Recovery"]}
                    />
                  </>
                )}

                {activeTab === 'enterprise' && (
                  <>
                    <ServiceCard
                      icon={Layers}
                      title="SAP Implementation"
                      color="accent"
                      desc="Expert SAP S/4HANA migration, consulting, and custom ABAP development. Streamlining enterprise resource planning for maximum efficiency."
                      points={["S/4HANA Migration", "Custom Modules", "ERP Integration"]}
                    />
                    <ServiceCard
                      icon={Server}
                      title="Legacy Modernization"
                      color="secondary"
                      desc="Strategic handling of AS400, Mainframe, and C/C++ applications. We bridge the gap between legacy reliability and modern requirements."
                      points={["AS400/IBMi", "Mainframe Refactoring", "Legacy Connectors"]}
                    />
                    <ServiceCard
                      icon={Zap}
                      title="Application Transformation"
                      color="primary"
                      desc="Holistic IT transformation of your entire software landscape. Reducing technical debt while increasing business agility and innovation speed."
                      points={["Code Refactoring", "System Integration", "Digital ROI"]}
                    />
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Expertise Section - Side by Side layout */}
      <section id="expertise" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-secondary font-bold tracking-widest uppercase mb-2">Expertise</h2>
              <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Deep Technology Spectrum</h3>
              <p className="text-foreground-muted mb-8 text-lg">
                We bring hands-on expertise across the entire technology spectrum, bridging the gap between legacy reliability and modern innovation.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { title: "AI & Innovation", desc: "Machine Learning, NLP, Predictive Analytics", icon: Cpu },
                  { title: "Enterprise ERP", desc: "SAP S/4HANA, ABAP, Module Customization", icon: Layers },
                  { title: "Cloud & DevOps", desc: "AWS/Azure, Kubernetes, CI/CD Pipelines", icon: Cloud },
                  { title: "Legacy Systems", desc: "AS400, Mainframe, C/C++ Modernization", icon: Server },
                  { title: "Web & Apps", desc: "Next.js, React, Mobile (iOS/Android)", icon: MonitorSmartphone },
                  { title: "Databases", desc: "DB2, Oracle, SQL Server, MySQL", icon: Database },
                  { title: "Infrastructure", desc: "Server Mgmt, Network, Security Audit", icon: Globe },
                  { title: "Integrations", desc: "REST/JSON APIs, Microservices", icon: Code2 },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100"
                  >
                    <div className="p-2.5 bg-primary/5 text-primary rounded-lg mt-1 group-hover:bg-primary group-hover:text-white transition-colors">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-base">{item.title}</h4>
                      <p className="text-sm text-foreground-muted">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-primary rounded-2xl p-10 text-white flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-6">Why It Matters</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Our holistic approach ensures that every solution is aligned with your business goals, enabling cost efficiency and operational agility.
                </p>
                <p className="text-lg font-medium text-secondary">
                  "We don't just implement technology — we transform your IT ecosystem into a strategic asset."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-choose-us" className="py-24 bg-gradient-to-b from-background-alt to-white">
        <div className="container mx-auto px-6 text-center max-w-4xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-12">Why Choose Us?</h2>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle2 className="text-secondary" size={28} />
                <h4 className="text-xl font-bold text-primary">Personalized Attention</h4>
              </div>
              <p className="text-foreground-muted">
                Direct engagement with experts. We offer a lean structure that adapts quickly to your needs.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle2 className="text-secondary" size={28} />
                <h4 className="text-xl font-bold text-primary">Cost Effective</h4>
              </div>
              <p className="text-foreground-muted">
                Deliver solutions without compromising quality. We optimize for value and long-term ROI.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle2 className="text-secondary" size={28} />
                <h4 className="text-xl font-bold text-primary">End-to-End Transformation</h4>
              </div>
              <p className="text-foreground-muted">
                Combining legacy expertise with modern innovation to provide a complete IT landscape overhaul.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-6 bg-white rounded-xl shadow-md border border-gray-100"
            >
              <div className="flex items-center gap-4 mb-4">
                <CheckCircle2 className="text-secondary" size={28} />
                <h4 className="text-xl font-bold text-primary">Security First</h4>
              </div>
              <p className="text-foreground-muted">
                A fundamental commitment to safeguarding your data and processes during any transformation.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="mb-8 text-gray-300 max-w-2xl mx-auto">
            Partner with Navagatha Tech for reliable, innovative, and future-proof IT solutions.
          </p>
          <Link href="/contact" className="inline-block px-10 py-5 bg-secondary text-primary font-bold rounded-full hover:bg-white transition-all shadow-xl shadow-secondary/20 hover:-translate-y-1">
            Contact Us Today
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
