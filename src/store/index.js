import { configureStore } from "@reduxjs/toolkit";
import delFailureReducer from "./delRegionModalSlice";
import failureReducer from "./failureModalSlice";
import maintenanceReducer from "./maintenanceModalSlice";
import updateDeviceReducer from "./updateDeviceSlice";
import updateModalReducer from "./updateModalSlice";

export const store = configureStore({
  reducer: {
    updateModal: updateModalReducer, // Reducer for update modal
    maintenance: maintenanceReducer, // Reducer for maintenance modal
    updateDevice: updateDeviceReducer, // Reducer for update device modal
    failureModal: failureReducer, // Reducer for failure modal
    delFailureModal: delFailureReducer, // Reducer for failure modal
  },
});
