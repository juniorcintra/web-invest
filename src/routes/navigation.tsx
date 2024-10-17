import Home from "@/pages/Home";
import Login from "@/pages/Login";
import NoRoute from "@/pages/NoRoute";

export const nav = [
  {
    path: "/home",
    name: "Home",
    element: <Home />,
    isPrivate: true,
  },
  {
    path: "*",
    name: "NotFound",
    element: <NoRoute />,
    isPrivate: true,
  },
  {
    path: "/login",
    name: "Login",
    element: <Login />,
    isPrivate: false,
  },
];
