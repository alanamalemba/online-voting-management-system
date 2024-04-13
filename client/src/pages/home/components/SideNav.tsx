import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { UserContext } from "../../../context/UserContextProvider";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import HowToVoteIcon from "@mui/icons-material/HowToVote";
import PollIcon from "@mui/icons-material/Poll";
import ContactSupportIcon from "@mui/icons-material/ContactSupport";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import AddBoxIcon from "@mui/icons-material/AddBox";
import TableChartIcon from "@mui/icons-material/TableChart";
import FactCheckIcon from "@mui/icons-material/FactCheck";

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
            className="flex gap-2 items-center hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/upcoming-elections`}
          >
            <HowToRegIcon />
            Register in upcoming elections
          </NavLink>

          <NavLink
            className="flex gap-2 items-center hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/vote`}
          >
            <HowToVoteIcon />
            Vote
          </NavLink>
        </>
      )}

      {user?.role === "admin" && (
        <>
          <NavLink
            className="flex gap-2 items-center hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/register-student`}
          >
            <PersonAddIcon />
            Add student registration number
          </NavLink>

          <NavLink
            className="flex gap-1 items-center hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/manage-user-roles`}
          >
            <GroupIcon />
            Manage user roles
          </NavLink>

          <NavLink
            className="flex gap-1 items-center hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/create-election`}
          >
            <AddBoxIcon />
            Create election
          </NavLink>

          <NavLink
            className="flex gap-1 items-center hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`election-report`}
          >
            <TableChartIcon />
            View election report
          </NavLink>
        </>
      )}

      {(user?.role === "candidate_registrar" ||
        user?.role === "voter_registrar" ||
        user?.role === "admin") && (
        <>
          <NavLink
            className="flex gap-1 items-center hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
            to={`/manage-elections`}
          >
            <FactCheckIcon />
            Manage elections
          </NavLink>
        </>
      )}

      <NavLink
        className="flex items-center gap-2 hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
        to={`election-results`}
      >
        <PollIcon />
        View election results
      </NavLink>

      <a
        href="mailto:alanlsamalemba@gmail.com?subject=SUPPORT%20REQUEST"
        className="flex items-center gap-2 hover:bg-indigo-100 py-3 px-4 rounded-md mx-4"
      >
        <ContactSupportIcon />
        Contact support
      </a>

      <hr />

      <button
        className="flex items-center gap-2 hover:bg-indigo-100  text-left py-3 px-4 rounded-md mx-4"
        onClick={handleLogout}
      >
        <LogoutIcon />
        Logout
      </button>
      <hr />
    </nav>
  );
}
