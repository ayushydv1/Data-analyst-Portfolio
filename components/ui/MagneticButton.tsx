"use client";

import {
  useReducedMotion,
  useSpring,
  useMotionValue,
  motion,
} from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/utils";

type MagneticButtonProps = {
  children: ReactNode;
  className?: string;
  href?: string;
  download?: boolean | string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  strength?: number;
  target?: string;
  rel?: string;
};

export function MagneticButton({
  children,
  className,
  href,
  download,
  onClick,
  type = "button",
  disabled,
  strength = 0.35,
  target,
  rel,
}: MagneticButtonProps) {
  const reduced = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.4 });

  const onMove = (event: MouseEvent<HTMLElement>) => {
    if (reduced || disabled) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const dx = event.clientX - (rect.left + rect.width / 2);
    const dy = event.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    className: cn(
      "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-colors",
      className,
    ),
    style: { x: springX, y: springY },
    onMouseMove: onMove,
    onMouseLeave: onLeave,
  };

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        target={target}
        rel={rel}
        onClick={onClick}
        {...shared}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      disabled={disabled}
      onClick={onClick}
      {...shared}
    >
      {children}
    </motion.button>
  );
}
