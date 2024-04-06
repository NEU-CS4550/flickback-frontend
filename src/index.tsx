import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "@/components/Layout";
import * as Pages from "@/pages";

import "./global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Pages.Home />}></Route>
          <Route path="/profile" element={<Pages.Profile />}></Route>
          <Route path="/settings" element={<Pages.Settings />}></Route>
          <Route path="/login" element={<Pages.Login />}></Route>
          <Route path="/logout" element={<Pages.Logout />}></Route>
          <Route path="/register" element={<Pages.Register />}></Route>
          <Route path="/search" element={<Pages.Search />}></Route>
          <Route path="/details" element={<Pages.Details />}></Route>
          <Route path="/watchlist" element={<Pages.Watchlist />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
