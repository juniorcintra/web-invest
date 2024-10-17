/* eslint-disable react-hooks/exhaustive-deps */
import { Route, Routes, useNavigate } from "react-router-dom";
import { nav } from "./navigation";
import { useEffect } from "react";
import { useGlobalStoreContext } from "@/store";

export default function Router() {
  const navigate = useNavigate();
  const { isAuthenticated } = useGlobalStoreContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      {nav
        .filter((r) => r.isPrivate === isAuthenticated)
        .map((r, i) => (
          <Route key={i} path={r.path} element={r.element} />
        ))}
    </Routes>
  );
}
