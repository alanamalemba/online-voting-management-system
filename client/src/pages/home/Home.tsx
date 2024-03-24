import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";

export default function Home() {
  return (
    <div className=" min-h-[500px] overflow-hidden flex flex-col md:flex-row relative bg-white   max-w-[1400px]  w-[95%] mx-auto border shadow rounded-lg -mt-32 ">
      <SideNav />
      <Outlet />
    </div>
  );
}
