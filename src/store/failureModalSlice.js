import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // Tracks whether the modal is open
};

export const failureModalSlice = createSlice({
  name: "failureModal",
  initialState,
  reducers: {
    openModal: state => {
      state.isOpen = true; // Set modal to open
    },
    closeModal: state => {
      state.isOpen = false; // Set modal to closed
    },
  },
});

// Export actions
export const { openModal, closeModal } = failureModalSlice.actions;

// Export reducer
export default failureModalSlice.reducer;
