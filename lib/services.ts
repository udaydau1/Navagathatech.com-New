export interface ServicePage {
    slug: string;
    title: string;
    shortTitle: string;
    metaDescription: string;
    hero: string;
    summary: string;
    primaryKeywords: string[];
    industries: string[];
    outcomes: string[];
    offerings: string[];
    faqs: { question: string; answer: string }[];
}

export const services: ServicePage[] = [
    {
        slug: "as400-modernization-migration",
        title: "AS400 Modernization and Migration Services",
        shortTitle: "AS400 Modernization",
        metaDescription:
            "End-to-end AS400 modernization services including RPG application transformation, API enablement, cloud migration and phased transition to modern platforms.",
        hero: "Modernize AS400 Without Business Disruption",
        summary:
            "We modernize IBM i / AS400 landscapes with phased delivery, data integrity controls and measurable business outcomes.",
        primaryKeywords: [
            "AS400 modernization",
            "IBM i modernization",
            "RPG modernization",
            "legacy migration",
            "AS400 cloud migration",
        ],
        industries: ["Manufacturing", "Retail", "Financial Services", "Healthcare", "Logistics"],
        outcomes: [
            "Reduced maintenance effort and faster feature release cycles",
            "Real-time integration between AS400 and modern cloud apps",
            "Improved audit readiness and operational visibility",
            "Lower infrastructure risk through staged transformation",
        ],
        offerings: [
            "AS400 code assessment and modernization roadmap",
            "RPG refactoring and API-first architecture enablement",
            "Database modernization and reporting acceleration",
            "Hybrid run model for phased legacy to modern migration",
        ],
        faqs: [
            {
                question: "Can you modernize AS400 without shutting down current operations?",
                answer:
                    "Yes. We use a phased migration strategy with coexistence patterns so your critical business processes remain available during transformation.",
            },
            {
                question: "Do you support RPG and DB2 workloads?",
                answer:
                    "Yes. We support RPG application modernization, DB2 optimization and integration with modern application stacks.",
            },
        ],
    },
    {
        slug: "sap-transformation-services",
        title: "SAP Transformation and S/4HANA Services",
        shortTitle: "SAP Transformation",
        metaDescription:
            "SAP transformation services for ECC and S/4HANA programs, including integration, process redesign, data migration and post-go-live optimization.",
        hero: "Scale Business Performance with SAP Transformation",
        summary:
            "From SAP assessment to implementation support, we help enterprises modernize processes and improve decision speed.",
        primaryKeywords: ["SAP transformation", "S/4HANA migration", "SAP implementation", "SAP integration"],
        industries: ["Manufacturing", "Retail", "Financial Services", "Healthcare"],
        outcomes: [
            "Standardized and optimized business processes across functions",
            "Reliable migration from legacy ERP to SAP-aligned architecture",
            "Faster reporting and improved data confidence",
            "Improved governance and compliance across operations",
        ],
        offerings: [
            "SAP transformation planning and target operating model",
            "S/4HANA migration support and validation framework",
            "ABAP enhancement and integration services",
            "Change management and user adoption support",
        ],
        faqs: [
            {
                question: "Do you only work on greenfield SAP implementations?",
                answer:
                    "No. We support both greenfield and brownfield transformation programs based on your process maturity and business priorities.",
            },
            {
                question: "Can SAP be integrated with legacy systems during transition?",
                answer:
                    "Yes. We design secure integration layers so SAP and legacy workloads can run in parallel until migration milestones are complete.",
            },
        ],
    },
    {
        slug: "cloud-transformation-and-devops",
        title: "Cloud Transformation and DevOps Services",
        shortTitle: "Cloud Transformation",
        metaDescription:
            "Cloud transformation services covering architecture modernization, migration planning, DevOps automation, observability and reliability engineering.",
        hero: "Move to Cloud with Security, Speed and Control",
        summary:
            "We design cloud-native foundations and DevOps pipelines that improve release velocity, reliability and cost visibility.",
        primaryKeywords: ["cloud transformation", "cloud migration", "DevOps services", "SRE"],
        industries: ["Retail", "Financial Services", "Healthcare", "Manufacturing"],
        outcomes: [
            "Faster application delivery through CI/CD automation",
            "Improved resilience with proactive monitoring and SRE practices",
            "Scalable infrastructure aligned to growth targets",
            "Transparent cloud cost and performance governance",
        ],
        offerings: [
            "Cloud readiness assessment and migration factory setup",
            "CI/CD pipeline engineering and deployment standardization",
            "Infrastructure as Code with policy-based governance",
            "Observability, incident response and reliability hardening",
        ],
        faqs: [
            {
                question: "Which cloud platforms do you support?",
                answer:
                    "We support AWS, Azure and GCP with platform-agnostic architecture patterns based on your business requirements.",
            },
            {
                question: "Can you modernize on-prem applications before cloud migration?",
                answer:
                    "Yes. We often combine application modernization with migration to improve cloud fit, performance and long-term maintainability.",
            },
        ],
    },
    {
        slug: "mainframe-and-legacy-transformation",
        title: "Mainframe and Legacy Transformation Services",
        shortTitle: "Mainframe Transformation",
        metaDescription:
            "Mainframe and legacy transformation services for modernization, integration and platform transition with governance-led execution.",
        hero: "Transform Legacy Platforms into Modern Digital Assets",
        summary:
            "We reduce technical debt and operational risk by modernizing mainframe and legacy platforms through structured programs.",
        primaryKeywords: ["mainframe modernization", "legacy transformation", "COBOL modernization", "application replatforming"],
        industries: ["Financial Services", "Retail", "Manufacturing", "Insurance"],
        outcomes: [
            "Reduced dependency on scarce legacy skill pools",
            "Improved integration with modern customer-facing systems",
            "Higher agility for product and process innovation",
            "Controlled transition with governance and rollback plans",
        ],
        offerings: [
            "Legacy portfolio discovery and modernization roadmap",
            "Mainframe integration and service enablement",
            "Replatforming, re-architecting or selective replacement strategy",
            "Risk-managed migration factory for critical workloads",
        ],
        faqs: [
            {
                question: "How do you reduce risk in mainframe migration?",
                answer:
                    "We use phased waves, regression controls and dual-run checkpoints so each transition stage is validated before cutover.",
            },
            {
                question: "Can modernization happen without replacing everything at once?",
                answer:
                    "Yes. We use incremental modernization to preserve stable components while modernizing high-value business capabilities first.",
            },
        ],
    },
    {
        slug: "as400-to-sap-migration",
        title: "AS400 to SAP Migration Services",
        shortTitle: "AS400 to SAP Migration",
        metaDescription:
            "Specialized AS400 to SAP migration services including process mapping, data migration, coexistence strategy and post-migration optimization.",
        hero: "Structured AS400 to SAP Migration for Enterprise Scale",
        summary:
            "We design and execute phased migration from AS400 workloads to SAP-aligned processes with minimum disruption and clear governance.",
        primaryKeywords: ["AS400 to SAP migration", "IBM i to SAP", "legacy ERP migration", "SAP transition services"],
        industries: ["Manufacturing", "Retail", "Financial Services"],
        outcomes: [
            "Clear transition path from AS400 business logic to SAP process models",
            "Controlled data migration with reconciliation checkpoints",
            "Reduced operational disruption during migration windows",
            "Post-migration process optimization for measurable ROI",
        ],
        offerings: [
            "AS400 workload analysis and SAP process mapping",
            "Data migration strategy, cleansing and reconciliation",
            "Hybrid coexistence model for phased transition",
            "SAP go-live readiness, stabilization and optimization",
        ],
        faqs: [
            {
                question: "Is AS400 to SAP migration feasible without long downtime?",
                answer:
                    "Yes. With phased cutover planning and coexistence architecture, downtime can be minimized while maintaining business continuity.",
            },
            {
                question: "Do you support finance and supply chain migration tracks?",
                answer:
                    "Yes. We support functional migration tracks including finance, procurement, manufacturing and supply chain flows.",
            },
        ],
    },
    {
        slug: "java-dotnet-custom-software-development",
        title: "Java and .NET Custom Software Development",
        shortTitle: "Java and .NET Development",
        metaDescription:
            "Custom software development services using Java and .NET for enterprise applications, integration platforms and modern digital products.",
        hero: "Build Enterprise-Grade Software with Java and .NET",
        summary:
            "We engineer secure, scalable custom applications in Java and .NET for mission-critical business use cases.",
        primaryKeywords: ["Java development", ".NET development", "custom software development", "enterprise application development"],
        industries: ["Healthcare", "Financial Services", "Retail", "Manufacturing"],
        outcomes: [
            "Faster release cycles with robust engineering standards",
            "Secure and scalable application foundations",
            "Improved user experience across web and integration layers",
            "Long-term maintainability and architecture resilience",
        ],
        offerings: [
            "Custom web platform development in Java and .NET",
            "API and integration layer engineering",
            "Application modernization and performance optimization",
            "Maintenance, support and feature acceleration programs",
        ],
        faqs: [
            {
                question: "Do you handle both greenfield and legacy modernization projects?",
                answer:
                    "Yes. We deliver both new product development and modernization of existing Java/.NET applications.",
            },
            {
                question: "Can you integrate Java and .NET systems with SAP or legacy platforms?",
                answer:
                    "Yes. We build integration services that connect Java/.NET platforms to SAP, AS400 and other enterprise systems.",
            },
        ],
    },
    {
        slug: "healthcare-it-transformation",
        title: "Healthcare IT Transformation Services",
        shortTitle: "Healthcare IT",
        metaDescription:
            "Healthcare IT transformation services for digital workflows, data platforms, interoperability and secure patient-centric systems.",
        hero: "Healthcare IT Transformation for Better Care Outcomes",
        summary:
            "We help healthcare organizations modernize systems, improve interoperability and accelerate digital care workflows.",
        primaryKeywords: ["healthcare IT services", "healthcare transformation", "hospital software modernization"],
        industries: ["Healthcare"],
        outcomes: [
            "Improved clinical workflow efficiency and reporting speed",
            "Secure handling of sensitive data with compliance-oriented controls",
            "Interoperable systems that reduce operational silos",
            "Better patient and provider digital experience",
        ],
        offerings: [
            "Healthcare platform modernization and integration",
            "Data and analytics enablement for operational intelligence",
            "Secure architecture and compliance-focused engineering",
            "Application support and managed transformation roadmap",
        ],
        faqs: [
            {
                question: "Can you modernize existing hospital systems without full replacement?",
                answer:
                    "Yes. We use phased modernization to preserve stable workflows while enabling new digital capabilities.",
            },
            {
                question: "Do you support healthcare analytics initiatives?",
                answer:
                    "Yes. We help build data pipelines and dashboards for clinical and operational decision support.",
            },
        ],
    },
    {
        slug: "financial-services-it-solutions",
        title: "Financial Services IT Solutions",
        shortTitle: "Financial Services IT",
        metaDescription:
            "Financial services IT solutions covering modernization, cloud readiness, integration, data strategy and operational reliability.",
        hero: "Modern IT Solutions for Financial Services Growth",
        summary:
            "We support financial institutions with resilient technology transformation programs focused on performance and governance.",
        primaryKeywords: ["financial services IT", "banking technology solutions", "fintech transformation"],
        industries: ["Financial Services", "Insurance"],
        outcomes: [
            "Higher transaction reliability and platform availability",
            "Improved risk visibility through integrated data architecture",
            "Stronger governance through standardized technology controls",
            "Faster digital product delivery with modern engineering practices",
        ],
        offerings: [
            "Core platform modernization and integration services",
            "Cloud and DevOps adoption for regulated environments",
            "Data platform enablement for insights and control",
            "Application reliability and incident reduction programs",
        ],
        faqs: [
            {
                question: "Do you work with regulated financial environments?",
                answer:
                    "Yes. We align engineering practices with governance, audit and operational control requirements.",
            },
            {
                question: "Can you modernize legacy banking systems incrementally?",
                answer:
                    "Yes. We design staged programs that prioritize business continuity and measurable modernization outcomes.",
            },
        ],
    },
    {
        slug: "retail-and-manufacturing-digital-transformation",
        title: "Retail and Manufacturing Digital Transformation",
        shortTitle: "Retail and Manufacturing",
        metaDescription:
            "Digital transformation services for retail and manufacturing including ERP modernization, analytics, integration and platform scalability.",
        hero: "Digital Transformation for Retail and Manufacturing",
        summary:
            "We help retail and manufacturing enterprises modernize operations, improve visibility and scale digital capabilities.",
        primaryKeywords: ["retail IT transformation", "manufacturing IT solutions", "digital transformation services"],
        industries: ["Retail", "Manufacturing"],
        outcomes: [
            "Improved supply chain and procurement visibility",
            "Better operational planning with integrated data",
            "Reduced process latency across order-to-cash and procure-to-pay",
            "Higher resilience across core digital operations",
        ],
        offerings: [
            "ERP and legacy system modernization",
            "Procurement and supply chain process digitization",
            "Data and analytics solutions for operations",
            "Platform integration for omnichannel execution",
        ],
        faqs: [
            {
                question: "Can you support procurement and supply chain digitization?",
                answer:
                    "Yes. We design and implement transformation programs for procurement, inventory and supply chain operations.",
            },
            {
                question: "Do you provide both strategy and implementation services?",
                answer:
                    "Yes. We support discovery, roadmap design, execution and post-go-live optimization.",
            },
        ],
    },
];

export function getServices() {
    return services;
}

export function getServiceBySlug(slug: string) {
    return services.find((service) => service.slug === slug);
}
