"use client";
import { FC } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  text: string;
  delay?: number;
  duration?: number;
}

export function WavyText({
  text,
  delay = 0,
  duration = 0.05,
  ...props
}: Props) {
  const letters = Array.from(text);

  const outer: Variants = {
    hidden: {
      opacity: 0,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration, delayChildren: i * delay },
    }),
  };

  const inner: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.h1
      style={{ display: "flex", overflow: "hidden" }}
      variants={outer}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={inner}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}
