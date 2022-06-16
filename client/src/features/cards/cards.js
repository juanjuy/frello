import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSingleBoard } from "../boards/boards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const fetchList = createAsyncThunk("boards/fetchBoards", async () => {
  const data = await apiClient.getBoards();
  return data;
});

const cardSlice = createSlice({
  name: "cards",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleBoard.fulfilled, (state, action) => {
      let filteredCards = state.filter(card => {
        return card.boardId !== action.payload._id;
      })

      action.payload.lists.forEach(list => {
        filteredCards = filteredCards.concat(list.cards);
      });

      return filteredCards;
    });
  }
});

export default cardSlice.reducer;
