import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../../context/UserContextProvider";

export default function SideNav() {
  const { user, setUser } = useContext(UserContext);
  function handleLogout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <nav
      id="side-bar"
      className=" py-4 border-r  border-slate-300 flex flex-col gap-2  text-slate-800 font-medium text-sm  lg:max-w-[25%] grow "
    >
      <Link className="flex items-center gap-2 mx-4" to={``}>
        <div className="h-[45px] w-[45px] rounded-full overflow-hidden border-[3px] p-[2px] border-indigo-200">
          <div className="h-full w-full bg-indigo-200  rounded-full  "></div>
        </div>

        <div>
          <p className="font-medium">
            {user?.first_name} {user?.last_name}
          </p>
          <p className="font-medium">{user?.role}</p>
        </div>
      </Link>

      <hr />

      {user?.role === "voter" && (
        <>
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
        </>
      )}

      {user?.role === "admin" && (
        <>
          <NavLink
            className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/register-student`}
          >
            Add student registration number
          </NavLink>

          <NavLink
            className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/manage-user-roles`}
          >
            Manage user roles
          </NavLink>

          <NavLink
            className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/create-election`}
          >
            Create election
          </NavLink>
        </>
      )}

      {(user?.role === "candidate_registrar" ||
        user?.role === "voter_registrar" ||
        user?.role === "admin") && (
        <>
          <NavLink
            className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/manage-elections`}
          >
            Manage elections
          </NavLink>
        </>
      )}

      <NavLink
        className="hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
        to={`election-results`}
      >
        View election results
      </NavLink>

      <hr />

      <button
        className=" hover:bg-indigo-100  text-left py-3 px-4 rounded-md mx-4"
        onClick={handleLogout}
      >
        Logout
      </button>
      <hr />
    </nav>
  );
}
