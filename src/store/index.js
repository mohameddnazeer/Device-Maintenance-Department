import { configureStore } from "@reduxjs/toolkit";
import maintenanceReducer from "./maintenanceModalSlice";
import receiveModalReducer from "./receiveModalSlice";
import updateDeviceReducer from "./updateDeviceSlice";
import updateModalReducer from "./updateModalSlice";
import updateStatusReducer from "./updateStatusSlice";

export const store = configureStore({
  reducer: {
    updateModal: updateModalReducer, // Reducer for update modal
    updateStatus: updateStatusReducer, // Reducer for update status modal
    maintenance: maintenanceReducer, // Reducer for maintenance modal
    updateDevice: updateDeviceReducer, // Reducer for update device modal
    receiveModal: receiveModalReducer, // Reducer for receive modal
  },
});
