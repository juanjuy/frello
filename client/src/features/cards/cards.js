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

export const getCard = createAsyncThunk("cards/getCard", async (id) => {
  const data = await apiClient.getCard(id);
  return data;
})

export const editCard = createAsyncThunk("cards/editCard", async (arg) => {
  const { id, callback, ...fields } = arg;
  const data = await apiClient.editCard(id, fields);
  if (callback) {
    callback();
  }
  return data;
})

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

      let cardsWithoutComments = filteredCards.map(card => {
        // eslint-disable-next-line no-unused-vars
        const { comments, ...cardWithoutComments } = card
        return cardWithoutComments
      })

      return cardsWithoutComments;
    });

    builder.addCase(createCard.fulfilled, (state, action) => {
      return state.concat(action.payload);
    });

    builder.addCase(getCard.fulfilled, (state, action) => {
      let filteredState = state.filter(card => card._id !== action.payload._id);

      return filteredState.concat(action.payload);
    });

    builder.addCase(editCard.fulfilled, (state, action) => {
      return state.map(card => {
        if (card._id === action.payload._id) {
          return action.payload;
        }

        return card;
      });
    })
  }
});

export default cardSlice.reducer;
