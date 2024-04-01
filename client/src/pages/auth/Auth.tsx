import { Outlet } from "react-router-dom";
import bgImage from "../../assets/images/login_banner.jpg";

export default function Auth() {
  return (
    <div className="min-h-[100vh]  flex  ">
      <div
        className="hidden sm:block min-h-screen  bg-cover bg-center bg-no-repeat w-1/2 "
        style={{ backgroundImage: `url(${bgImage})` }}
      >
        <div className="h-full w-full bg-primaryColor bg-opacity-50"></div>
      </div>

      <Outlet />
    </div>
  );
}
