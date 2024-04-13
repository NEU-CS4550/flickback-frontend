import Navigation from "@/components/Navigation";
import { AlertProvider } from "@/utils/alert";
import { useAuth } from "@/utils/auth";
import { ReactNode } from "react";

import "./styles.css";

export default function Layout({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return (
    <div className="Layout">
      <Navigation />
      {user !== undefined && (
        <div className="Layout__content">
          <AlertProvider>{children}</AlertProvider>
        </div>
      )}
    </div>
  );
}
