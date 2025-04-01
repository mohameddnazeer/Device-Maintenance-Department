import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // Tracks whether the modal is open
  rowData: null, // Stores the data of the row to be updated
};
export const receiveModalSlice = createSlice({
  name: "receiveModal",
  initialState,
  reducers: {
    openModal: state => {
      state.isOpen = true; // Set modal to open
    },
    closeModal: state => {
      state.isOpen = false; // Set modal to closed
    },
    toggleModal: state => {
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
export const { openModal, closeModal, toggleModal, setRowData, clearRowData } =
  receiveModalSlice.actions;

// Export reducer
export default receiveModalSlice.reducer;
