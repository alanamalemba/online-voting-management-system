import { Link } from "react-router-dom";
import CreateElection from "./components/CreateElection";

export default function ManageElections() {
  return (
    <div className="bg-yellow-200 min-h-screen  ">
      <section className="bg-yellow-700 p-4">
        <div className="max-w-[1000px] m-auto flex items-center gap-6 text-white">
          <Link title="Go Back" to={`/`}>
            Back
          </Link>
          <h2 className="text-xl font-medium text-center grow">
            Manage and Create Elections
          </h2>
        </div>
      </section>

      <section className="py-4 px-2 flex  max-w-[1000px] m-auto  ">
        <nav className="flex flex-col min-w-[200px]  shadow-md p-2  bg-yellow-100 rounded font-medium  gap-6 h-fit">
          <h3 className="bg-yellow-700 p-1 rounded-t-md text-white text-center">
            Options
          </h3>
          <Link to={``}>Create Election</Link>
          <Link to={``}>View created elections</Link>
          <Link to={``}>Candidate Applications</Link>
          <Link to={``}>Voter Applications</Link>
        </nav>
        <CreateElection />
      </section>
    </div>
  );
}
