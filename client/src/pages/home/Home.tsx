import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";

export default function Home() {
  return (
    <div className="  min-h-[500px] overflow-hidden flex flex-col lg:flex-row relative bg-white   max-w-[80%]  mx-auto border shadow rounded-lg -mt-14 md:-mt-24 ">
      <SideNav />
      <Outlet />
    </div>
  );
}
