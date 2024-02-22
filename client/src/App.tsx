import { Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/components/Login";
import SignUp from "./pages/auth/components/SignUp";
import { useEffect, useState } from "react";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsLoggedIn(true);
    }
    console.log(user);
  }, []);

  console.log(isLoggedIn);

  return (
    <main className=" min-h-screen">
      {isLoggedIn ? (
        <nav>nnn</nav>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route index element={<Login setIsLoggedIn={setIsLoggedIn} />} />
            <Route
              path="sign-up"
              element={<SignUp setIsLoggedIn={setIsLoggedIn} />}
            />
          </Route>
        </Routes>
      )}
    </main>
  );
}
