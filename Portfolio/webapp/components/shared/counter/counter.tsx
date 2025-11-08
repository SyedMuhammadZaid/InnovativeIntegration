"use client";

import { motion, useAnimationFrame, useInView } from "framer-motion";
import { useState, useRef, useEffect } from "react";

interface CounterProps {
  from?: number;
  to: number;
  duration?: number; // in seconds
  className?: string;
}

export default function Counter({ from = 0, to, duration = 2, className }: CounterProps) {
  const [count, setCount] = useState(from);
  const startTime = useRef<number | null>(null);
  const rafActive = useRef<boolean>(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  useEffect(() => {
    if (isInView) {
      // Start animation only when in view
      rafActive.current = true;
      startTime.current = null;
    }
  }, [isInView]);

  useAnimationFrame((t) => {
    if (!rafActive.current || !isInView) return;

    if (startTime.current === null) {
      startTime.current = t;
    }

    const elapsed = (t - startTime.current) / 1000;
    const progress = Math.min(elapsed / duration, 1);
    const current = from + (to - from) * progress;

    setCount(Math.floor(current));

    if (progress === 1) {
      rafActive.current = false;
    }
  });

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className={className}
    >
      {count.toLocaleString()}
    </motion.span>
  );
}
