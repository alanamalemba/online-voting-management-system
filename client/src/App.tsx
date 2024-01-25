import "./App.css";
import { Toaster } from "react-hot-toast";
import MainRoutes from "./components/MainRoutes";

export default function App() {
  return (
    <>
      <main>
        <Toaster />
        <MainRoutes />
      </main>
    </>
  );
}
