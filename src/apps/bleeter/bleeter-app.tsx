import { BleeterNav } from "./components/nav";
import { BleeterHomePage } from "./pages/home/home-page";
// import { BleeterSearchPage } from "./pages/search/search-page";

export function BleeterApp() {
  return (
    <div className="flex flex-col w-full h-full bg-background">
      <BleeterHomePage />
      {/* <BleeterSearchPage /> */}
      <BleeterNav />
    </div>
  );
}
