import { createBrowserRouter } from "react-router";
import Layout from "@/pages"
import Home from "@/pages/home"

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: Home },
    ],
  },
])

export default router