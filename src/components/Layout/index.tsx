import Navigation from "@/components/Navigation";
import { AlertProvider } from "@/utils/alert";
import { ReactNode } from "react";

import "./styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="Layout">
      <Navigation />
      <div className="Layout__content">
        <AlertProvider>{children}</AlertProvider>
      </div>
    </div>
  );
}
