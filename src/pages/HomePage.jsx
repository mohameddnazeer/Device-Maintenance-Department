// import { UpdateOpForm } from "@/components/update-op-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    const refreshToken = window.localStorage.getItem("refreshToken");
    const user = window.localStorage.getItem("user");
    if (!accessToken || !refreshToken || !user) navigate("/login", { replace: true });

    // TODO come back to this when we have dashboard
    // const parsedUser = JSON.parse(user);
    // if (parsedUser.role === "Admin") navigate("/dashboard", { replace: true });
    navigate("/maintenance", { replace: true });
  }, [navigate]);

  return (
    <div>
      <p>test</p>
    </div>
  );
};
