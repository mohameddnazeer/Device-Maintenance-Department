import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  refetch: false, // Initial state for refetch
};
export const refetchOpSlice = createSlice({
  name: "refetchOp",
  initialState,
  reducers: {
    resetRefetchOp: state => {
      state.refetch = false; // Reset modal state
    },
    setRefetchOp: state => {
      state.refetch = true; // Set modal state to a specific value
    },
  },
});

// Export actions
export const { resetRefetchOp, setRefetchOp } = refetchOpSlice.actions;

// Export reducer
export default refetchOpSlice.reducer;
