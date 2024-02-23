import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/components/Login";
import SignUp from "./pages/auth/components/SignUp";
import { useContext } from "react";
import Header from "./layout/header/Header";
import { UserContext } from "./context/UserContextProvider";

export default function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main className=" min-h-screen bg-indigo-50">
      {isLoggedIn ? (
        <Header />
      ) : (
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>
        </Routes>
      )}
    </main>
  );
}
