import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, setIsLoggedIn, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.clear();

    toast.success("Logged out successfully!");
    navigate(`/`);
  }
  return (
    <header className=" bg-yellow-400 py-6 px-4 text-white sticky top-0 z-50 bg-opacity-90">
      <div className="flex justify-between items-center max-w-[1000px] m-auto">
        <h1 className="text-xl font-bold  ">
          <Link to={`/`}>Online Voting System</Link>
        </h1>

        <nav className="flex items-center gap-4 font-semibold text-sm">
          <span>{user?.name}</span>

          <button onClick={handleLogout}>Logout</button>
        </nav>
      </div>
    </header>
  );
}
