export const API_ENDPOINTS = {
  LOGIN: "api/users/login",
  REFRESH_TOKEN: "api/token/refresh",
  REGIONS: "api/regions",
  GATES: regionId => `api/regions/${regionId}/gates`,
  DEPARTMENTS: (regionId, gateId) => `api/regions/${regionId}/gates/${gateId}/departments`,
  OFFICES: (regionId, gateId, deptId) =>
    `api/regions/${regionId}/gates/${gateId}/departments/${deptId}/offices`,
  DEVICES: "api/devices",
  DEVICE: id => `api/devices/${id}`,
  MAINTENANCE: "api/maintenance",
};

export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  REGISTER: "/register",
  ADD_USER: "/addUser",
  ALL_DEVICES: "/alldevices",
  ADD_DEVICE: "/addDevice",
  MAINTENANCE: "/maintenance",
  DEVICE_DETAILS:
    "/regions/:regionId/gates/:gateId/departments/:deptId/offices/:officeId/devices/:id",
};

export const STORAGE_KEYS = {
  ACCESS_TOKEN: "accessToken",
  REFRESH_TOKEN: "refreshToken",
  USER: "user",
};

export const USER_ROLES = {
  ADMIN: "Admin",
  USER: "User",
};
