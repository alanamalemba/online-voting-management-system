import "./App.css";
import { Toaster } from "react-hot-toast";
import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import Header from "./layout/Header";
import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Home from "./pages/home/Home";
import Login from "./pages/auth/components/Login";
import CreateAccount from "./pages/auth/components/CreateAccount";
import ManageElections from "./pages/manageElections/ManageElections";

export default function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main className="">
      <Toaster />

      {isLoggedIn && <Header />}

      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/manage-elections" element={<ManageElections />} />
          </>
        ) : (
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="/create-account" element={<CreateAccount />} />
          </Route>
        )}
      </Routes>
    </main>
  );
}
