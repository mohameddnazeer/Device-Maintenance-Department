import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // Tracks whether the modal is open
  rowData: null, // Stores the data of the row to be updated
};

export const updateStatusSlice = createSlice({
  name: "updateStatus",
  initialState,
  reducers: {
    openStatus: state => {
      state.isOpen = true; // Set modal to open
    },
    closeStatus: state => {
      state.isOpen = false; // Set modal to closed
    },
    toggleStatus: state => {
      state.isOpen = !state.isOpen; // Toggle modal state
    },
    setRowData: (state, action) => {
      state.rowData = action.payload; // Set the row data for the modal
    },
    clearRowData: state => {
      state.rowData = null; // Clear the row data when modal is closed
    },
  },
});

// Export actions
export const { openStatus, closeStatus, toggleStatus, setRowData, clearRowData } =
  updateStatusSlice.actions;

// Export reducer
export default updateStatusSlice.reducer;
