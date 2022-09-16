import axios from "axios";
import * as routes from "../constants/ApiRoutes";

function logError(errorResponse) {
  const response = errorResponse.response;

  if (response && response.data && response.data.error) {
    console.error(`HTTP Error: ${response.data.error}`);
  } else {
    console.error("Error: ", errorResponse);
  }
}

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.common["Accept"] = "application/json";

const apiClient = {
  getBoards: async () => {
    try {
      const { data } = await axios.get(routes.BOARDS_INDEX_URL);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  createBoard: async (board) => {
    try {
      const { data } = await axios.post(routes.CREATE_BOARD_URL, { board });
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getSingleBoard: async (id) => {
    try {
      const { data } = await axios.get(routes.BOARD_ID_URL + id);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  addList: async(list) => {
    try {
      const { data } = await axios.post(routes.CREATE_LIST_URL, list);
      return data
    } catch (e) {
      logError(e);
    }
  },
  editList: async (fields, id) => {
    try {
      const { data } = await axios.put(routes.EDIT_LIST_URL + id, fields);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  addCard: async (fields) => {
    try {
      const { data } = await axios.post(routes.ADD_CARD_URL, fields);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getCard: async (id) => {
    try {
      const { data } = await axios.get(routes.GET_CARD_URL + id);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  editCard: async (id, fields) => {
    try {
      const { data } = await axios.put(routes.EDIT_CARD_URL + id, fields);
      return data;
    } catch (e) {
      logError(e);
    }
  },
  getComments: async (cardId) => {
    try {
      const { data } = await axios.get(routes.GET_COMMENTS_URL + cardId + '/comments');
      return data;
    } catch (e) {
      logError(e);
    }
  },
  addComment: async (cardId, text) => {
    try {
      console.log("CARD ID AND TEXT", cardId, text)
      const { data } = await axios.post(routes.ADD_COMMENT_URL, { cardId, comment: { text } })
      console.log("DATE", data);
      return data;
    } catch (e) {
      logError(e);
    }
  }
};

export default apiClient;
