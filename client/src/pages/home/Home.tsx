import { Outlet } from "react-router-dom";
import SideNav from "./components/SideNav";

export default function Home() {
  return (
    <div className=" overflow-hidden flex flex-col lg:flex-row relative bg-white   max-w-[1200px]  w-[95%] mx-auto border shadow rounded-lg -mt-32 ">
      <SideNav />
      <Outlet />
    </div>
  );
}
