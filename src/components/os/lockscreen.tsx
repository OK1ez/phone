import { motion } from "framer-motion";
import { Indicator } from "./indicator";
import Background from "@/assets/backgrounds/ifruit.webp";

interface LockscreenProps {
  showIndicator?: boolean | null;
  onIndicatorClick?: () => void;
  isAnimating?: boolean;
}

export function Lockscreen({
  showIndicator,
  onIndicatorClick,
  isAnimating,
}: LockscreenProps): JSX.Element {
  return (
    <motion.div
      className="flex items-center justify-center w-full h-full bg-cover lockscreen"
      initial={{ y: 0 }}
      animate={{ y: isAnimating ? '-100%' : 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{ backgroundImage: `url(${Background})` }}
    >
      <p className="text-lg font-medium mb-36">21:10</p>
      {showIndicator && <Indicator onIndicatorClick={onIndicatorClick} />}
    </motion.div>
  );
}
