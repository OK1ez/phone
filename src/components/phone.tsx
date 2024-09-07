import { BleeterApp } from "@/apps/bleeter/bleeter-app";
import { Indicator } from "./os/indicator";
import PhoneWrapper from "./phone-wrapper";
import { Signal, WifiHigh } from "lucide-react";
import { MessagesApp } from "@/apps/messages/messages-app";

export default function Phone() {
  return (
    <PhoneWrapper>
      <div className="relative flex flex-col w-full h-full">
        <header className="absolute z-50 flex items-center justify-between w-full px-8 py-4">
          <p className="font-medium ">13:03</p>
          <button className="flex gap-2">
            <WifiHigh className="mb-2 w-7 h-7" />
            <Signal className="w-6 h-6 mt-[0.40rem]" />
          </button>
        </header>
        <>
          <BleeterApp />
          {/* <MessagesApp /> */}
        </>
        <Indicator />
      </div>
    </PhoneWrapper>
  )
}