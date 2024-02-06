import { Link } from "react-router-dom";

export default function Home() {
  return (
    <section className="h-screen ">
      <div className="bg-yellow-700 text-white px-4 py-6 ">
        <div className="flex flex-col gap-2 max-w-[1000px] m-auto ">
          <h2 className="text-2xl font-bold">
            Welcome to Online voting System
          </h2>

          <p className=" text-sm font-medium">
            This system provides voters with an easier way to find important
            elections and enable easier remote voting.
          </p>

          <p className=" text-sm font-medium">
            Please select an action below to get started.
          </p>

          <Link
            className="bg-yellow-400 w-fit p-2 rounded font-semibold text-sm "
            to={`/`}
          >
            Contact Support
          </Link>
        </div>
      </div>

      <div className="bg-yellow-200 h-full">
        <nav className="max-w-[1000px] text-center m-auto p-4 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
          <Link
            to={`/upcoming-elections`}
            className=" bg-yellow-50 hover:scale-105 duration-300 p-1 h-[170px] rounded shadow-lg flex justify-center items-center"
          >
            View upcoming elections
          </Link>

          <Link
            to={`/`}
            className=" bg-yellow-50 hover:scale-105 duration-300  p-1 h-[170px] rounded shadow-lg flex justify-center items-center"
          >
            Vote in elections you are registered in
          </Link>

          <Link
            to={`/`}
            className=" bg-yellow-50 hover:scale-105 duration-300 p-1 h-[170px] rounded shadow-lg flex justify-center items-center"
          >
            View election results
          </Link>

          <Link
            to={`/manage-elections`}
            className=" bg-yellow-50 hover:scale-105 duration-300 p-1 h-[170px] rounded shadow-lg flex justify-center items-center"
          >
            Manage and Create Elections
          </Link>

          <Link
            to={`/`}
            className=" bg-yellow-50 hover:scale-105 duration-300 p-1 h-[170px] rounded shadow-lg flex justify-center items-center"
          >
            Manage my Account
          </Link>
        </nav>
      </div>
    </section>
  );
}
