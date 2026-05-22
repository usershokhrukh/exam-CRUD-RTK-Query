import {createSlice} from "@reduxjs/toolkit";
const modalSlice = createSlice({
  name: "modalSlice",
  initialState: {
    modals: false,
    user: {},
    type: "none",
  },
  reducers: {
    modalsToggle: (state) => {
      state.modals = !state.modals;
    },
    userAdd: (state, action) => {
      state.user = action?.payload;
    },
    clearUser: (state) => {
      state.user = {};
    },
    typeChange: (state, action) => {
      state.type = action.payload;
    },
  },
});

export default modalSlice.reducer;
export const {modalsToggle, userAdd, clearUser, typeChange} =
  modalSlice.actions;
