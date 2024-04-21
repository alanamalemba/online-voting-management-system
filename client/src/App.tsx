import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/auth/Auth";
import Login from "./pages/auth/login/Login";
import { useContext } from "react";
import Header from "./layout/header/Header";
import { UserContext } from "./context/UserContextProvider";
import Home from "./pages/home/Home";
import DefaultPage from "./pages/defaultPage/DefaultPage";
import CreateElection from "./pages/createElection.tsx/CreateElection";
import ManageUserRoles from "./pages/manageuserRoles/ManageUserRoles";
import UpcomingElections from "./pages/upcomingElections/UpcomingElections";
import ManageElections from "./pages/manageElections/ManageElections";
import CandidateApplications from "./pages/candidateApplications/CandidateApplications";
import VoterApplications from "./pages/voterApplications/VoterApplications";
import Vote from "./pages/vote/Vote";
import ElectionResults from "./pages/electionResults/ElectionResults";
import RegisterStudent from "./pages/registerStudent/RegisterStudent";
import SignUp from "./pages/auth/signUp/SignUp";
import ViewElectionReport from "./pages/viewElectionReport/ViewElectionReport";
import ResetPassword from "./pages/auth/resetPassword/ResetPassword";
import EditElection from "./pages/editElection/EditElection";
import EditAccount from "./pages/editAccount/EditAccount";

export default function App() {
  const { user } = useContext(UserContext);

  return (
    <main className=" min-h-screen bg-indigo-50 pb-6">
      {user ? (
        // if logged in
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<DefaultPage />} />
              <Route path="/create-election" element={<CreateElection />} />
              <Route path="/vote" element={<Vote />} />
              <Route path="/register-student" element={<RegisterStudent />} />
              <Route path="/edit-account" element={<EditAccount />} />

              <Route path="/manage-elections" element={<ManageElections />} />
              <Route
                path="/manage-elections/candidate-applications/:eid"
                element={<CandidateApplications />}
              />

              <Route
                path="/manage-elections/edit-election/:eid"
                element={<EditElection />}
              />

              <Route
                path="/manage-elections/voter-applications/:eid"
                element={<VoterApplications />}
              />

              <Route
                path="/upcoming-elections"
                element={<UpcomingElections />}
              />

              <Route path="/election-results" element={<ElectionResults />} />
              <Route path="/election-report" element={<ViewElectionReport />} />

              <Route path="/manage-user-roles" element={<ManageUserRoles />} />
            </Route>

            <Route path="*" element={<Navigate to={`/`} />} />
          </Routes>
        </>
      ) : (
        // if not logged in
        <Routes>
          <Route path="/" element={<Auth />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
          </Route>

          <Route path="/reset-password/:email" element={<ResetPassword />} />
          <Route path="*" element={<Navigate to={`/`} />} />
        </Routes>
      )}
    </main>
  );
}
