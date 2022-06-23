import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createComment = createAsyncThunk("comments/createComment", async (arg) => {
  const { callback, ...fields } = arg;
  const data = await apiClient.addCard(fields);
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
      return action.payload;
    })
  }
});

export default commentSlice.reducer;
