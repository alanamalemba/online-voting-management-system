import { Outlet } from "react-router-dom";

export default function Auth() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-6 bg-yellow-500 h-screen">
      <h1 className="text-4xl text-white font-bold ">
        Welcome To Online Voting System
      </h1>
      <Outlet />
    </div>
  );
}
