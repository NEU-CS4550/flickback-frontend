import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "@/components/Layout";
import * as Pages from "@/pages";
import { AuthProvider, useAuth } from "./utils/auth";
import { ReactNode } from "react";

import "./global.css";

function Protected({ element }: { element: ReactNode }) {
  const { user } = useAuth();
  if (user === null) {
    return <Navigate to="/login" />;
  } else if (user === undefined) {
    return <></>;
  } else {
    return element;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Home />} />
          <Route
            path="/profile"
            element={<Protected element={<Pages.Profile />} />}
          />
          <Route path="/settings" element={<Pages.Settings />} />
          <Route path="/login" element={<Pages.Login />} />
          <Route path="/logout" element={<Pages.Logout />} />
          <Route path="/register" element={<Pages.Register />} />
          <Route path="/search" element={<Pages.Search />} />
          <Route path="/details" element={<Pages.Details />} />
          <Route path="/watchlist" element={<Pages.Watchlist />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
