import { configureStore } from "@reduxjs/toolkit";
import delFailureReducer from "./delRegionModalSlice";
import failureReducer from "./failureModalSlice";
import maintenanceReducer from "./maintenanceModalSlice";
import receiveModalReducer from "./receiveModalSlice";
import refetchReducer from "./refetchOpSlice";
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
    refetchOp: refetchReducer, // Reducer for refetching data
    failureModal: failureReducer, // Reducer for failure modal
    delFailureModal: delFailureReducer, // Reducer for failure modal
  },
});
