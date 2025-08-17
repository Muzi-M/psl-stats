"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface FloatingAnimationProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

export function FloatingAnimation({
  children,
  className,
  duration = 3000,
  delay = 0,
  direction = "up",
}: FloatingAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  const getTransform = () => {
    switch (direction) {
      case "up":
        return "translateY(0px)";
      case "down":
        return "translateY(0px)";
      case "left":
        return "translateX(0px)";
      case "right":
        return "translateX(0px)";
      default:
        return "translateY(0px)";
    }
  };

  const getKeyframes = () => {
    switch (direction) {
      case "up":
        return "animate-float-up";
      case "down":
        return "animate-float-down";
      case "left":
        return "animate-float-left";
      case "right":
        return "animate-float-right";
      default:
        return "animate-float-up";
    }
  };

  return (
    <div
      className={cn(
        "transition-all duration-500 ease-out",
        isVisible && getKeyframes(),
        className
      )}
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        transform: getTransform(),
      }}
    >
      {children}
    </div>
  );
}

export function FloatingCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "animate-float-card transition-all duration-300 ease-out hover:scale-105 hover:-translate-y-2 transform-gpu",
        className
      )}
    >
      {children}
    </div>
  );
}

export function GlowEffect({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative group", className)}>
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-primary/10 to-primary/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
      {children}
    </div>
  );
}

export function ParticleBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2000}ms`,
              animationDuration: `${2000 + Math.random() * 3000}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
