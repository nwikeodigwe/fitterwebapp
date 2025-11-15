import type { RootState } from "@/store";
import { useSelector } from "react-redux";
import { redirect } from "react-router";

const Auth = () => {
  const auth = useSelector((state: RootState) => state.auth)
  if (!auth.isAuthenticated) throw redirect("/");
};

export default Auth;