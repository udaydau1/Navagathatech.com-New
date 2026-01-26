import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { CaseStudy } from "@/lib/case-studies";

const fadeIn = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8 }
};

interface FeaturedCaseStudiesProps {
    studies: CaseStudy[];
}

import * as React from 'react';
import { Header } from "./Header";
import { Footer } from "./Footer";

// We'll keep the visual parts of the homepage in the main file but refactor them to be server-compatible
// or move the motion parts to a client wrapper if needed.
// Actually, I'll just refactor app/page.tsx to be a proper Server Component.
