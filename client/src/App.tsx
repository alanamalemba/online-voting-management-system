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
import UpcomingElections from "./pages/upcomingElections/UpcomingElections";
import UpcomingElection from "./pages/upcomingElection/UpcomingElection";
import ManageAndCreateElections from "./pages/manageAndCreateElections/ManageAndCreateElections";
import CreateElection from "./pages/manageAndCreateElections/components/CreateElection";
import ManageElections from "./pages/manageAndCreateElections/components/manageElections/ManageElections";
import CandidateApplications from "./pages/manageAndCreateElections/components/manageElections/components/CandidateApplications";
import VoterApplications from "./pages/manageAndCreateElections/components/manageElections/components/VoterApplications";
import ElectionsList from "./pages/manageAndCreateElections/components/manageElections/components/ElectionsList";

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

            <Route
              path="/manage-and-create-elections"
              element={<ManageAndCreateElections />}
            >
              <Route path="create-election" element={<CreateElection />} />
              <Route path="manage-elections" element={<ManageElections />}>
                <Route index element={<ElectionsList />} />

                <Route
                  path="candidate-applications/:eid"
                  element={<CandidateApplications />}
                />
                <Route
                  path="voter-applications/:eid"
                  element={<VoterApplications />}
                />
              </Route>
            </Route>

            <Route path="/upcoming-elections" element={<UpcomingElections />} />

            <Route
              path="/upcoming-election/:id"
              element={<UpcomingElection />}
            />
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
