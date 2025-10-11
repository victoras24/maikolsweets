import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="site-wrapper">
      <Header />
      <main className="main-wrapper">
        <Outlet />
      </main>
    </div>
  );
}
