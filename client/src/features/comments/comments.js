import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createComment = createAsyncThunk("comments/createComment", async (arg) => {
  const { callback, cardId, text } = arg;
  const data = await apiClient.addComment(cardId, text);
  if (callback) {
    callback();
  }
  return data;
});

export const getComments = createAsyncThunk("comments/getComments", async (cardId) => {
  const data = await apiClient.getComments(cardId);
  return data;
});

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getComments.fulfilled, (state, action) => {
      let currentCardId = action.payload[0]?.cardId;
      let filteredComments = state.filter(comment => comment.cardId !== currentCardId);
      return filteredComments.concat(action.payload);
    })

    builder.addCase(createComment.fulfilled, (state, action) => {
      return state.concat(action.payload);
    })
  }
});

export default commentSlice.reducer;
