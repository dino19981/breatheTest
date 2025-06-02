"use client";

import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

interface AnimatedRouteProps {
  children: ReactNode;
}

export function AnimatedRoute({ children }: AnimatedRouteProps) {
  const pathname = usePathname();

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{
        ease: "easeInOut",
        stiffness: 400,
        damping: 25,
        duration: 0.15,
      }}
      style={{ position: "relative", height: "100%" }}
    >
      {children}
    </motion.div>
  );
}
