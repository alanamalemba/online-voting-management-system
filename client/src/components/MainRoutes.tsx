import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Auth from "../pages/auth/Auth";
import Login from "../pages/auth/components/Login";
import CreateAccount from "../pages/auth/components/CreateAccount";
import { Route, Routes } from "react-router-dom";

export default function MainRoutes() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={"jjj"} />
      ) : (
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Route>
      )}
    </Routes>
  );
}
