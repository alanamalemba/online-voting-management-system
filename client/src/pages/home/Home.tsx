import { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../../context/UserContextProvider";

export default function Home() {
  const { user, setIsLoggedIn } = useContext(UserContext);

  function handleLogout() {
    localStorage.clear();
    setIsLoggedIn(false);
  }
  return (
    <div className=" overflow-hidden flex bg-white  relative max-w-[1200px]  w-[95%] mx-auto border shadow rounded-lg -mt-32 ">
      <nav
        id="side-bar"
        className="  py-4 border-r  border-slate-300 flex flex-col gap-2  text-slate-800 font-medium text-sm w-1/4"
      >
        <Link className="flex items-center gap-2 mx-4" to={``}>
          <div className="h-[45px] w-[45px] rounded-full overflow-hidden border-[3px] p-[2px] border-indigo-200">
            <div className="h-full w-full bg-indigo-200  rounded-full  "></div>
          </div>
          <span className="font-medium">
            {user?.first_name} {user?.last_name}
          </span>
        </Link>

        <NavLink
          className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
          to={`/upcoming-elections`}
        >
          Register in upcoming elections
        </NavLink>

        <NavLink
          className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
          to={`/vote`}
        >
          Vote
        </NavLink>

        <NavLink
          className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
          to={`election-results`}
        >
          View election results
        </NavLink>

        <NavLink
          className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
          to={`/create-election`}
        >
          Create election
        </NavLink>

        <NavLink
          className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
          to={`/manage-elections`}
        >
          Manage elections
        </NavLink>

        <NavLink
          className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
          to={`/manage-elections`}
        >
          Manage user roles
        </NavLink>

        <hr />

        <button
          className=" text-left py-3 px-4 rounded-md mx-4"
          onClick={handleLogout}
        >
          Logout
        </button>
      </nav>

      <Outlet />
    </div>
  );
}
