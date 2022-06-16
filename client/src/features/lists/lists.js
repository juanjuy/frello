import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSingleBoard } from "../boards/boards";
import apiClient from "../../lib/ApiClient";

const initialState = [];

// list data is only fetched when a board is loaded (fetchSingleBoard).
  // when fetchsingleboard is fulfilled
  // load the lists into state

  // double dispatch maybe? (within board component) 
    // can we handle two reducers with fetchSingleBoard?

export const fetchList = createAsyncThunk("boards/fetchBoards", async () => {
  const data = await apiClient.getBoards();
  return data;
});

const listSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSingleBoard.fulfilled, (state, action) => {
      let listsWithoutCards = action.payload.lists.reduce((acc, list) => {
        // eslint-disable-next-line
        const { cards, ...listWithoutCards } = list;
        return acc.concat(listWithoutCards);
      }, []);

      let filteredLists = state.filter(list => {
        return list.boardId !== action.payload._id;
      })
      return filteredLists.concat(listsWithoutCards)
    });
  }
});

export default listSlice.reducer;
