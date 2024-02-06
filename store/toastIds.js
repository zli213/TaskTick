import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  toastIds: [],
};

export const toastIdsSlice = createSlice({
  name: "toastIds",
  initialState,
  reducers: {
    addToastId: (state, action) => {
      state.toastIds.push(action.payload);
    },
    removeToastId: (state, action) => {
      state.toastIds = state.toastIds.filter((id) => id !== action.payload);
    },
  },
});

export const { addToastId, removeToastId } = toastIdsSlice.actions;

export default toastIdsSlice.reducer;
export const addToastIdAction = (id) => (dispatch) => {
  dispatch(addToastId(id));
};
