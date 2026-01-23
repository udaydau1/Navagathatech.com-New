"use client";

import { motion, HTMLMotionProps } from "framer-motion";

interface ClientMotionWrapperProps extends HTMLMotionProps<"div"> {
    children: React.ReactNode;
}

export function ClientMotionWrapper({ children, ...props }: ClientMotionWrapperProps) {
    return <motion.div {...props}>{children}</motion.div>;
}
