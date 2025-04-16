import { tabs } from "@/components/update-op-modal";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false, // Tracks whether the modal is open
  rowData: null, // Stores the data of the row to be updated
  selectedTab: tabs[0].key, // Default selected tab in the modal
};

export const updateModalSlice = createSlice({
  name: "updateModal",
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
    setSelectedTab: (state, action) => {
      state.selectedTab = action.payload;
    },
    resetSelectedTab: state => {
      state.selectedTab = tabs[0].key; // Reset selected tab to the first tab
    },
    nextTab: state => {
      const currentIndex = tabs.findIndex(tab => tab.key === state.selectedTab);
      const nextIndex = (currentIndex + 1) % tabs.length; // Loop back to the first tab
      state.selectedTab = tabs[nextIndex].key; // Set the next tab as selected
    },
    prevTab: state => {
      const currentIndex = tabs.findIndex(tab => tab.key === state.selectedTab);
      const prevIndex = (currentIndex - 1 + tabs.length) % tabs.length; // Loop back to the last tab
      state.selectedTab = tabs[prevIndex].key; // Set the previous tab as selected
    },
  },
});

// Export actions
export const {
  openModal,
  closeModal,
  toggleModal,
  setRowData,
  clearRowData,
  setSelectedTab,
  resetSelectedTab,
  nextTab,
  prevTab,
} = updateModalSlice.actions;

// Export reducer
export default updateModalSlice.reducer;
