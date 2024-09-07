import { ReactNode } from "react";
import Background from "@/assets/backgrounds/ifruit.webp";
import { Signal, WifiHigh } from "lucide-react";
import { Notch } from "./notch";

interface PhoneWrapperProps {
  children: ReactNode;
  lockPhone?: () => void;
  showIndicator?: boolean | null;
  onIndicatorClick?: () => void;
}

export default function PhoneWrapper({
  children,
  lockPhone
}: PhoneWrapperProps) {
  return (
    <div
      className="absolute flex w-[30rem] h-[63rem]"
      style={{ transform: `scale(0.8)` }}
    >
      <div className="absolute w-full">
        <button 
          onClick={lockPhone} 
          className="absolute z-50 w-1 h-32 bg-[#797683] shadow-inner rounded-full left-[30.3rem] top-44" 
          aria-label="close" 
        />
        <div className="h-32 w-1.5 top-32 absolute flex flex-col z-0">
          <button 
            className="absolute w-full h-12 bg-[#797683] shadow-inner rounded-full right-2.5" 
            aria-label="mute" 
          />
          <button 
            className="absolute w-full h-24 bg-[#797683] shadow-inner rounded-full right-2.5 top-24" 
            aria-label="volume-up" 
          />
          <button 
            className="absolute w-full h-24 bg-[#797683] shadow-inner rounded-full right-2.5 top-56" 
            aria-label="volume-down" 
          />
        </div>
      </div>
      <div className="w-full h-full bg-black rounded-[3.5rem] shadow-frame p-3 flex z-10">
        <Notch />
        <div
          className="w-full h-full rounded-[3rem] bg-cover bg-black overflow-hidden"
          style={{ backgroundImage: `url(${Background})` }}
        >
          <div className="relative flex flex-col w-full h-full">
            <header className="absolute z-50 flex items-center justify-between w-full px-8 py-4">
              <p className="font-medium ">13:03</p>
              <button className="flex gap-2" aria-label="control-center">
                <WifiHigh className="mb-2 w-7 h-7" />
                <Signal className="w-6 h-6 mt-[0.40rem]" />
              </button>
            </header>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
