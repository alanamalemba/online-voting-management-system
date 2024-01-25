import { Route, Routes } from "react-router-dom";
import "./App.css";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/subComponents/Login";
import CreateAccount from "./components/auth/subComponents/CreateAccount";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <main>
      <Toaster />
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
        </Route>
      </Routes>
    </main>
  );
}
