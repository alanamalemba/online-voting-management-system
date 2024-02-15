import { Outlet } from "react-router-dom";

export default function ManageElections() {
  return (
    <div className="max-w-[1000px] mx-auto ">
      <h2 className="font-semibold text-lg text-center">Manage Elections</h2>

      <Outlet />
    </div>
  );
}
