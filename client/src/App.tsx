import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/components/Login";
import SignUp from "./pages/auth/components/SignUp";

export default function App() {
  return (
    <main className=" min-h-screen">
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route index element={<Login />} />
          <Route path="sign-up" element={<SignUp />} />
        </Route>
      </Routes>
    </main>
  );
}
