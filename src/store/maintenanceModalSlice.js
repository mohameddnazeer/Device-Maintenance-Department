import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // Tracks whether the modal is open
  rowData: null, // Stores the data of the row
  ID: null, // Stores the ID of the row
};

export const maintenanceSlice = createSlice({
  name: "maintenance",
  initialState,
  reducers: {
    openMaintenance: state => {
      state.isOpen = true; // Set modal to open
    },
    closeMaintenance: state => {
      state.isOpen = false; // Set modal to closed
    },
    toggleMaintenance: state => {
      state.isOpen = !state.isOpen; // Toggle modal state
    },
    setRowData: (state, action) => {
      state.rowData = action.payload; // Set the row data for the modal
    },
    clearRowData: state => {
      state.rowData = null; // Clear the row data when modal is closed
    },
    setID: (state, action) => {
      state.ID = action.payload; // Set the ID of the row
    },
    clearID: state => {
      state.ID = null; // Clear the ID when modal is closed
    },
  },
});

// Export actions
export const {
  openMaintenance,
  closeMaintenance,
  toggleMaintenance,
  setRowData,
  clearRowData,
  setID,
  clearID,
} = maintenanceSlice.actions;

// Export reducer
export default maintenanceSlice.reducer;
