import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/components/Login";
import SignUp from "./pages/auth/components/SignUp";
import { useContext } from "react";
import Header from "./layout/header/Header";
import { UserContext } from "./context/UserContextProvider";
import Home from "./pages/home/Home";
import DefaultPage from "./pages/defaultPage/DefaultPage";
import CreateElection from "./pages/createElection.tsx/CreateElection";
import ManageUserRoles from "./pages/manageuserRoles/ManageUserRoles";
import UpcomingElections from "./pages/upcomingElections/UpcomingElections";

export default function App() {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <main className=" min-h-screen bg-indigo-50 pb-6">
      {isLoggedIn ? (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<DefaultPage />} />
              <Route path="/create-election" element={<CreateElection />} />
              <Route
                path="/upcoming-elections"
                element={<UpcomingElections />}
              />
              <Route path="/manage-user-roles" element={<ManageUserRoles />} />
            </Route>
            <Route path="*" element={<Navigate to={`/`} />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="*" element={<Navigate to={`/`} />} />
          </Route>
        </Routes>
      )}
    </main>
  );
}
