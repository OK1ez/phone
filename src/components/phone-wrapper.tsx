import { ReactNode } from "react";
import Background from "@/assets/backgrounds/ifruit.webp"
import { Notch } from "./os/notch";

interface PhoneWrapperProps {
  children: ReactNode;
}

export default function PhoneWrapper({ children }: PhoneWrapperProps) {
  return(
    <>
      <div
        className="absolute flex w-[30rem] h-[63rem]"
        style={{
          transform: `scale(0.8)`,
        }}
      >
        <div className="absolute w-full">
          <button className="absolute z-50 w-1 h-32 bg-[#797683] shadow-inner rounded-full left-[30.3rem] top-44" aria-label="close"></button>
          <div className="h-32 w-1.5 top-32 absolute flex flex-col z-0">
            <button className="absolute w-full h-12 bg-[#797683] shadow-inner rounded-full right-2.5" aria-label="mute"></button>
            <button className="absolute w-full h-24 bg-[#797683] shadow-inner rounded-full right-2.5 top-24" aria-label="volume-up"></button>
            <button className="absolute w-full h-24 bg-[#797683] shadow-inner rounded-full right-2.5 top-56" aria-label="volume-down"></button>
          </div>
        </div>
        <div className="w-full h-full bg-black rounded-[3.5rem] shadow-frame p-3 flex z-10">
          <Notch />
          <div
            className="w-full h-full rounded-[3rem] bg-cover bg-black overflow-hidden"
            // style={{backgroundImage: `url(${Background})`}} 
          >
            {children}
          </div>
        </div>
      </div>
    </>
  )
}