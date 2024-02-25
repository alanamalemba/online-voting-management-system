import { useContext } from "react";
import logo from "../../assets/images/logo1_white.png";
import { UserContext } from "../../context/UserContextProvider";

export default function Header() {
  const { user } = useContext(UserContext);
  const fullName = user?.first_name + " " + user?.last_name;

  return (
    <header className="relative bg-indigo-900 h-[33vh] font-medium text-white ">
      <nav className="absolute left-0 right-0  top-0 z-10 max-w-[1200px] mx-auto flex justify-between p-4 border-b border-indigo-600">
        <img className="h-[40px] w-[160px] object-cover" src={logo} alt="" />

        <div className="flex gap-2 items-center">
          <span>{fullName}</span>

          <div className="h-[45px] w-[45px] rounded-full overflow-hidden border-[3px] p-[2px] border-white">
            <div className="h-full w-full bg-indigo-200  rounded-full  "></div>
          </div>
        </div>
      </nav>

      <div className="py-6 px-4 absolute z-10 top-1/4 max-w-[1200px] mx-auto left-0 right-0">
        <h1 className="text-4xl font-bold text-indigo-200">
          Online Voting System
        </h1>
      </div>

      <div className=" flex absolute top-0 bottom-0 left-0  right-0  ">
        <div
          className="h-full w-1/2 bg-indigo-800 "
          style={{ borderRadius: "0% 100% 100% 0% / 0% 100% 0% 100% " }}
        >
          {" "}
        </div>

        <div
          className="h-full w-1/2 bg-indigo-800 "
          style={{ borderRadius: "100% 0% 100% 0% / 100% 100% 0% 0% " }}
        ></div>
      </div>
    </header>
  );
}
