import { createSlice } from "@reduxjs/toolkit";
import { updateTaskTag, deleteTaskTag } from "./tasks";

const initialState = {
  tags: null,
};

export const labelSlice = createSlice({
  name: "labels",
  initialState,
  reducers: {
    initialLabels: (state, action) => {
      state.tags = action.payload;
    },
    addTag: (state, action) => {
      state.tags.push(action.payload);
    },
    updateTag: (state, action) => {
      const index = state.tags.indexOf(action.payload.oldTag);
      state.tags[index] = action.payload.newTag;
    },
    deleteTag: (state, action) => {
      const index = state.tags.indexOf(action.payload);
      state.tags = [
        ...state.tags.slice(0, index),
        ...state.tags.slice(index + 1),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const { initialLabels, addTag, updateTag, deleteTag } =
  labelSlice.actions;

export default labelSlice.reducer;

export const editOneTagAction = (oldTag, newTag) => (dispatch) => {
  dispatch(updateTag({ oldTag, newTag }));
  dispatch(updateTaskTag({ oldTag, newTag }));
};

export const deleteOneTagAction = (tag) => (dispatch) => {
  dispatch(deleteTag(tag));
  dispatch(deleteTaskTag(tag));
};
