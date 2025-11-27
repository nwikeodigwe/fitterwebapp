import { createBrowserRouter } from "react-router";
import Layout from "@/pages";
import ProfileLayout from "@/pages/profile";
import Home from "@/pages/home";
import Profile from "@/pages/profile";
import Logout from "@/pages/logout";
import NotFound from "@/pages/notfound";
import List from "@/pages/list";
import View from "@/pages/view";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: ":model",
        children: [
          {
            index: true,
            Component: List,
          },
          {
            path: ":slug",
            Component: View,
          },
        ],
      },
      {
        path: "/profile",
        Component: ProfileLayout,
        children: [{ index: true, Component: Profile }],
      },
      {
        path: "logout",
        Component: Logout,
      },
    ],
  },
  {
    path: "not-found",
    Component: NotFound,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
