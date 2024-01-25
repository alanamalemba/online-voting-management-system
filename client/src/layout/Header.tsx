import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";

export default function Header() {
  const { user, setIsLoggedIn, setUser } = useContext(UserContext);

  console.log(user);

  function handleLogout() {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.clear();
    toast.success("Logged out successfully!");
  }
  return (
    <header className=" bg-yellow-400 py-6 px-4 text-white sticky top-0 z-30">
      <div className="flex justify-between items-center max-w-[1000px] m-auto">
        <h1 className="text-xl font-bold  ">Online Voting System</h1>

        <nav className="flex items-center gap-4 font-semibold text-sm">
          <span>{user?.name}</span>

          <button onClick={handleLogout}>Logout</button>
        </nav>
      </div>
    </header>
  );
}
