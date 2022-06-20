import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSingleBoard } from "../boards/boards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

export const createCard = createAsyncThunk("cards/createCard", async (arg) => {
  const { callback, ...fields } = arg;
  const data = await apiClient.addCard(fields);
  if (callback) {
    callback();
  }
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

    builder.addCase(createCard.fulfilled, (state, action) => {
      return state.concat(action.payload);
    })
  }
});

export default cardSlice.reducer;
