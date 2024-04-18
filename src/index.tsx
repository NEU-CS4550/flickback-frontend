import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./utils/auth";
import { ReactNode } from "react";
import Layout from "./components/Layout";
import * as Pages from "@/pages";

import "./global.css";

function Protected({
  element,
  reverse = false,
  admin = false,
}: {
  element: ReactNode;
  reverse?: boolean;
  admin?: boolean;
}) {
  const { user } = useAuth();
  if (user === null) {
    return reverse ? element : <Navigate to="/login" />;
  } else if (user === undefined) {
    return <></>;
  } else {
    if (admin && user.role != "ADMIN") return <Navigate to="/profile" />;
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
          <Route
            path="/admin"
            element={<Protected admin element={<Pages.Admin />} />}
          />
          <Route path="/404" element={<Pages.NotFound />} />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  </AuthProvider>
);
