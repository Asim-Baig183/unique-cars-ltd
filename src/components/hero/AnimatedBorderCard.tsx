import React from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/utils";

export const AnimatedBorderCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("relative p-[1.5px] overflow-hidden rounded-lg w-full max-w-7xl mx-auto", className)}>
      {/* Rotating Gradient Light */}
      <motion.div
        className="absolute inset-[-1000%] bg-[conic-gradient(from_0deg_at_50%_50%,#000000_0%,#000000_70%,#e3ba73_90%,#000000_100%)]"
        animate={{ rotate: 360 }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner Content Box */}
      <div className="relative z-10 w-full bg-[#000000bd] backdrop-blur-md rounded-lg">
        {children}
      </div>
    </div>
  );
};