import { Link, Outlet } from "react-router-dom";

export default function ManageAndCreateElections() {
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

      <section className="py-4 px-2 flex flex-col gap-2  max-w-[1000px] m-auto  ">
        <nav className="flex  w-full shadow-md p-2  bg-yellow-100 rounded font-medium  justify-evenly">
          <Link to={`./create-election`}>Create Election</Link>
          <Link to={`./manage-elections`}>Manage Elections</Link>
        </nav>
      </section>

      <Outlet />
    </div>
  );
}
