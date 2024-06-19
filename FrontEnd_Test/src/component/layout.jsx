import NavBar from "./navBar";
import SideBare from "./sideBare";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <main className="flex bg-gray-100 h-screen overflow-hidden">
      <SideBare />
      <div className="flex-1 flex flex-col overflow-y-auto">
        <NavBar />
        <section className="flex-1 text-slate-900 py-6 px-8">
          <Outlet /> {/* Render nested routes here */}
        </section>
      </div>
    </main>
  );
};

export default Layout;
