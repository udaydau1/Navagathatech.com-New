import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getServiceSchema, getFAQPageSchema } from "@/lib/schema";
import { getCaseStudies } from "@/lib/case-studies";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, CheckCircle2, Cloud, Code2, Cpu, Database, Globe, Layers, MonitorSmartphone, Server, ShieldCheck, Zap } from "lucide-react";
import { CapabilitiesSection } from "@/components/CapabilitiesSection";
import { ClientMotionWrapper } from "@/components/ClientMotionWrapper";

const faqs = [
  {
    question: "What services does Navagatha Tech provide?",
    answer: "Navagatha Tech offers a comprehensive range of IT services including Web & Mobile Development, AI & Machine Learning, Data Analytics, SAP Implementation, Legacy Modernization (AS400/Mainframe) and Cloud DevOps."
  },
  {
    question: "Do you specialize in legacy system modernization?",
    answer: "Yes, we have deep expertise in modernizing legacy systems like AS400 and Mainframe, bridging the gap between legacy reliability and modern tech stacks."
  },
  {
    question: "Where is Navagatha Tech located?",
    answer: "Our registered office is located in Andheri (West), Mumbai, India, but we serve clients globally."
  },
  {
    question: "What is your approach to digital transformation?",
    answer: "We take a holistic approach, aligning technology innovation with business goals to ensure scalability, security and operational excellence."
  }
];

const fadeInProps = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8 }
};

export default async function Home() {
  const studies = await getCaseStudies();
  const featuredStudies = studies.slice(0, 3);

  // Generate schemas for services
  const services = [
    { name: "Web & Mobile Development", category: "Software Development", description: "End-to-end development of scalable web and mobile applications." },
    { name: "AI & Machine Learning", category: "Artificial Intelligence", description: "Leveraging AI to automate workflows and deliver intelligent experiences." },
    { name: "Data & Analytics", category: "Data Science", description: "Comprehensive data strategy from warehousing to visualization." },
    { name: "Legacy Modernization", category: "Digital Transformation", description: "Modernizing AS400, Mainframe, and older software landscapes." }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-secondary selection:text-primary">
      {/* Service Schemas */}
      {services.map((s, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceSchema(s)) }}
        />
      ))}

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFAQPageSchema(faqs)) }}
      />

      <Header />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 overflow-hidden">
        {/* Background elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 translate-x-1/4 z-0" />
        <div className="absolute top-40 left-10 w-64 h-64 bg-secondary/10 rounded-full blur-[100px] z-0" />

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl">
            <ClientMotionWrapper {...fadeInProps}>
              <span className="inline-block py-1 px-4 rounded-full bg-secondary/10 text-primary border border-secondary/20 text-xs font-bold uppercase tracking-widest mb-8">
                Next-Gen IT Transformation
              </span>
              <h1 className="text-5xl md:text-8xl font-extrabold text-primary mb-8 leading-tight tracking-tight">
                Empowering <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">Innovation</span> Through <br />
                Reliable Technology
              </h1>
              <p className="text-xl md:text-2xl text-foreground-muted mb-12 max-w-2xl leading-relaxed">
                Navagatha Tech is your strategic partner for digital transformation, bridging legacy reliability with modern technology excellence.
              </p>
              <div className="flex flex-wrap gap-6">
                <Link
                  href="/contact"
                  className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 flex items-center gap-2"
                >
                  Start Your Transformation <ArrowRight size={20} />
                </Link>
                <Link
                  href="/#about"
                  className="px-10 py-5 bg-white text-primary border border-primary/10 font-bold rounded-full hover:border-primary/30 transition-all hover:bg-gray-50 flex items-center gap-2"
                >
                  Discover Navagatha
                </Link>
              </div>
            </ClientMotionWrapper>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <ClientMotionWrapper
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 relative shadow-2xl group">
                <Image
                  src="/images/about.png"
                  alt="Navagatha Tech Team collaborating on IT transformation and application modernization"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute -bottom-6 -right-6 w-3/4 h-3/4 border-2 border-secondary/30 rounded-2xl z-[-1]" />
              </div>
            </ClientMotionWrapper>

            <ClientMotionWrapper
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-secondary font-bold tracking-widest uppercase mb-4">Strategic Partnership</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-primary mb-8 leading-tight">
                Next-Generation IT Services Driven by <span className="text-secondary">Execution Excellence</span>
              </h3>
              <p className="text-lg text-foreground-muted mb-8 leading-relaxed">
                At Navagatha Tech, we don't just provide services, we build long-term partnerships. Our philosophy centers on technology innovation paired with reliable delivery.
              </p>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">Modern Innovation</h4>
                    <p className="text-foreground-muted">Leveraging AI, Cloud, and Next-gen tech stacks for business growth.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <CheckCircle2 size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-primary mb-1">Reliable Delivery</h4>
                    <p className="text-foreground-muted">Consistent, high-quality execution with global delivery standards.</p>
                  </div>
                </div>
              </div>
            </ClientMotionWrapper>
          </div>
        </div>
      </section>

      {/* Capabilities Section - Refactored to Client Component */}
      <CapabilitiesSection />

      {/* Expertise Stats Section */}
      <section id="expertise" className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-white/5 skew-x-12 translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid md:grid-cols-4 gap-12 text-center">
            <div className="space-y-4">
              <h4 className="text-5xl font-extrabold text-secondary">20+</h4>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Tech Stacks Covered</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-5xl font-extrabold text-secondary">15+</h4>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Enterprises Served</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-5xl font-extrabold text-secondary">99%</h4>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Delivery Reliability</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-5xl font-extrabold text-secondary">24/7</h4>
              <p className="text-sm font-bold uppercase tracking-widest opacity-60">Global Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Case Studies Section */}
      <section id="featured-case-studies" className="py-24 bg-background-alt overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-secondary font-bold tracking-widest uppercase mb-2">Our Impact</h2>
              <h3 className="text-3xl md:text-5xl font-bold text-primary mb-6">Success Stories</h3>
              <p className="text-lg text-foreground-muted leading-relaxed">
                See how we've empowered businesses across the globe with innovative IT solutions and strategic transformations.
              </p>
            </div>
            <Link
              href="/case-studies"
              className="px-8 py-4 bg-white border border-border text-primary font-bold rounded-full hover:border-secondary hover:text-secondary transition-all flex items-center gap-2 group shadow-sm hover:shadow-md"
            >
              View All Case Studies <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredStudies.map((study) => (
              <ClientMotionWrapper
                key={study.id}
                {...fadeInProps}
                className="bg-white p-8 rounded-3xl shadow-xl hover:shadow-2xl transition-all border border-gray-100 group flex flex-col h-full"
              >
                <div className="mb-6">
                  <span className="inline-block py-1 px-3 rounded-full bg-primary/5 text-primary text-[10px] font-bold uppercase tracking-wider mb-4">
                    {study.category}
                  </span>
                  <h4 className="text-xl font-bold text-primary group-hover:text-secondary transition-colors mb-4 line-clamp-2">
                    {study.title}
                  </h4>
                  <p className="text-foreground-muted text-sm leading-relaxed mb-6 line-clamp-3">
                    {study.summary}
                  </p>
                </div>
                <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{study.client}</span>
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="text-primary font-bold text-sm hover:text-secondary flex items-center gap-1 transition-colors"
                  >
                    Details <ArrowRight size={14} />
                  </Link>
                </div>
              </ClientMotionWrapper>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="bg-primary rounded-[40px] p-12 md:p-24 text-center text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-6xl font-bold mb-8">Ready to evolve your digital landscape?</h2>
              <p className="text-xl opacity-80 mb-12">
                Join forces with Navagatha Tech and transform your IT reliability and innovation potential.
              </p>
              <Link
                href="/contact"
                className="px-12 py-6 bg-secondary text-primary font-extrabold text-xl rounded-full hover:bg-white transition-all shadow-xl hover:shadow-secondary/20 inline-flex items-center gap-3"
              >
                Connect With Us Today <ArrowRight size={24} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-secondary font-bold tracking-widest uppercase mb-2">Knowledge Base</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-primary mb-6">Frequently Asked Questions</h3>
          </div>
          <div className="max-w-4xl mx-auto grid gap-6">
            {faqs.map((faq, idx) => (
              <ClientMotionWrapper
                key={idx}
                {...fadeInProps}
                className="p-8 rounded-2xl bg-background-alt border border-gray-100 hover:border-secondary transition-all"
              >
                <h4 className="text-xl font-bold text-primary mb-3">{faq.question}</h4>
                <p className="text-foreground-muted leading-relaxed">{faq.answer}</p>
              </ClientMotionWrapper>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
