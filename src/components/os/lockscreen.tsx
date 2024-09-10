import { motion } from "framer-motion";
import { Indicator } from "./indicator";
import Background from "@/assets/backgrounds/ifruit.webp";
import { useState, useCallback } from "react";

interface LockscreenProps {
  onIndicatorClick: () => void;
}

export function Lockscreen({ onIndicatorClick }: LockscreenProps): JSX.Element {
  const [isAnimating, setIsAnimating] = useState(false);

  const openPhone = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      onIndicatorClick();
    }, 300);
  }, [onIndicatorClick]);

  return (
    <motion.div
      className="flex items-center justify-center w-full h-full bg-cover lockscreen"
      initial={{ y: 0 }}
      animate={{ y: isAnimating ? "-100%" : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ backgroundImage: `url(${Background})` }}
    >
      <p className="text-lg font-medium mb-36">21:10</p>
      <Indicator onIndicatorClick={openPhone} />
    </motion.div>
  );
}
