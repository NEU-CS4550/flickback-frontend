import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import * as Pages from "@/pages";
import { AuthProvider, useAuth } from "./utils/auth";
import { ReactNode } from "react";
import Layout from "./components/Layout";

import "./global.css";

function Protected({
  element,
  reverse = false,
}: {
  element: ReactNode;
  reverse?: boolean;
}) {
  const { user } = useAuth();
  if (user === null) {
    return reverse ? element : <Navigate to="/login" />;
  } else if (user === undefined) {
    return <></>;
  } else {
    return reverse ? <Navigate to="/profile" /> : element;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route index element={<Pages.Home />} />
          <Route
            path="/profile"
            element={<Protected element={<Pages.Profile />} />}
          />
          <Route path="/users/:profileId" element={<Pages.Profile />} />
          <Route path="/settings" element={<Pages.Settings />} />
          <Route
            path="/login"
            element={<Protected reverse element={<Pages.Login />} />}
          />
          <Route
            path="/logout"
            element={<Protected element={<Pages.Logout />} />}
          />
          <Route
            path="/register"
            element={<Protected reverse element={<Pages.Register />} />}
          />
          <Route path="/search" element={<Pages.Search />} />
          <Route path="/movies/:movieId" element={<Pages.Details />} />
          <Route path="/watchlist" element={<Pages.Watchlist />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </AuthProvider>
);
