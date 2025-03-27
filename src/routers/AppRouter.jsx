import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Login } from "../pages/Login";
// import AddDevice from "../pages/AddDevice";
import { getUrl } from "@/lib/utils";
import AddDevice from "@/pages/AddDevice";
import axios from "axios";
import { useInterval } from "usehooks-ts";
import AllDevices from "../pages/AllDevices";
import { MaintenanceOperations } from "../pages/MaintenanceOperations";
import { ReadyForDelivery } from "../pages/ReadyForDelivery";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="login" element={<Login />} />
      {/* <Route path="register" element={<Register />} /> */}
      <Route path="/" element={<Login />} />
      {/* <Route path="/" element={<MainLayout />} /> */}
      <Route path="/alldevices" element={<AllDevices />} />
      <Route path="/home" element={<AllDevices />} />
      <Route path="/addDevice" element={<AddDevice />} />
      <Route path="/maintenance-operations" element={<MaintenanceOperations />} />
      <Route path="/ready-for-delivery" element={<ReadyForDelivery />} />
    </>
  )
);
const AppRouter = () => {
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
      const {
        data: { accessToken, refreshToken },
      } = await axios.request(config);
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
    }
  }, 1 * 60 * 1000);
  return <RouterProvider router={router} />;
};

export default AppRouter;
