// import { UpdateOpForm } from "@/components/update-op-form";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = window.localStorage.getItem("accessToken");
    console.log("🚀 ~ useEffect ~ accessToken:", accessToken);
    const refreshToken = window.localStorage.getItem("refreshToken");
    console.log("🚀 ~ useEffect ~ refreshToken:", refreshToken);
    const user = window.localStorage.getItem("user");
    console.log("🚀 ~ useEffect ~ user:", user);
    if (accessToken && refreshToken && user) navigate("/maintenance", { replace: true });

    // TODO come back to this when we have dashboard
    // const parsedUser = JSON.parse(user);
    // if (parsedUser.role === "Admin") navigate("/dashboard", { replace: true });
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <div>
      <p>test</p>
    </div>
  );
};
