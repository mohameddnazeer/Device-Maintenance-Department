import { getUrl } from "@/lib/utils";
import AddDevice from "@/pages/AddDevice";
import AddUser from "@/pages/AddUser";
import DeviceDetailsPage from "@/pages/DeviceDetailsPage";
import { HomePage } from "@/pages/HomePage";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useInterval } from "usehooks-ts";
import AllDevices from "../pages/AllDevices";
import { Login } from "../pages/Login";
import { MaintenanceOperations } from "../pages/MaintenanceOperations";

const AppRouter = () => {
  const navigate = useNavigate();

  useInterval(async () => {
    const accessToken = window.localStorage.getItem("accessToken");
    const refreshToken = window.localStorage.getItem("refreshToken");
    let config = {
      method: "post",
      url: getUrl() + "api/token/refresh",
      headers: { "Content-Type": "application/json" },
      data: { accessToken, refreshToken },
    };
    if (accessToken && refreshToken) {
      try {
        const {
          data: { accessToken, refreshToken },
        } = await axios.request(config);
        window.localStorage.setItem("accessToken", accessToken);
        window.localStorage.setItem("refreshToken", refreshToken);
        const decodedUser = jwtDecode(accessToken);
        const user = {
          name: decodedUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
          id: decodedUser["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"],
          role: decodedUser["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
        };
        if (user) window.localStorage.setItem("user", JSON.stringify(user));
      } catch (error) {
        window.localStorage.removeItem("accessToken");
        window.localStorage.removeItem("refreshToken");
        window.localStorage.removeItem("user");
        navigate("/login");
      }
    }
  }, 23 * 60 * 60 * 1000);

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/addUser" element={<AddUser />} />
      <Route path="/alldevices" element={<AllDevices />} />
      <Route path="/addDevice" element={<AddDevice />} />
      <Route path="/maintenance" element={<MaintenanceOperations />} />
      <Route
        path="/regions/:regionId/gates/:gateId/departments/:deptId/offices/:officeId/devices/:id"
        element={<DeviceDetailsPage />}
      />
      {/* <Route path="register" element={<Register />} /> */}
      {/* <Route path="/home" element={<AllDevices />} /> */}
      {/* <Route path="/ready-for-delivery" element={<ReadyForDelivery />} /> */}
      {/* <Route path="/maintenance/:id" element={<MaintenanceDetailsPage />} /> */}
    </Routes>
  );
};

export default AppRouter;
