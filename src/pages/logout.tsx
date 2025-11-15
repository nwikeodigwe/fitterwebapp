import { resetAllState } from "@/utils/state.utils";
import { useNavigate } from "react-router";
import type { AppDispatch } from "@/store";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    resetAllState(dispatch);
    navigate("/");
  }, [navigate, dispatch]);

  return (
    <div className="h-screen flex items-center justify-center">
      Logging out...
    </div>
  );
};

export default Logout;
