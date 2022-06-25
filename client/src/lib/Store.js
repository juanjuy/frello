import { configureStore } from "@reduxjs/toolkit";
import boardsReducer from "../features/boards/boards";
import listsReducer from "../features/lists/lists";
import cardsReducer from "../features/cards/cards";
import commentsReducer from "../features/comments/comments";

const store = configureStore({
  reducer: {
    boards: boardsReducer,
    lists: listsReducer,
    cards: cardsReducer,
    comments: commentsReducer,
  },
});

export default store;
