import Navigation from "@/components/Navigation";
import { Outlet } from "react-router-dom";

import "./styles.css";

export default function Layout() {
  return (
    <div className="Layout">
      <Navigation />
      <div className="Layout__content">
        <Outlet />
      </div>
    </div>
  );
}
