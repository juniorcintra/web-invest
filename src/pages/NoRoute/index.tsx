/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useGlobalStoreContext } from "@/store";

export default function NoRoute() {
  const navigate = useNavigate();
  const { isAuthenticated } = useGlobalStoreContext();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    } else {
      if (window.location.pathname !== "/login") {
        navigate("/login");
      }
    }
  }, [isAuthenticated]);

  return <></>;
}
