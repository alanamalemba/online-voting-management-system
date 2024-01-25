import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Toaster } from "react-hot-toast";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/components/Login";
import CreateAccount from "./pages/auth/components/CreateAccount";

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
