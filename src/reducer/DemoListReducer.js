import {
  FETCH_LISTDEMO_BEGIN,
  FETCH_LISTDEMO_FAILURE,
  FETCH_LISTDEMO_SUCCESS,
} from "../action/1_ActionConstants";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export default function DemoListReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_LISTDEMO_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_LISTDEMO_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      // console.log(state);
      return {
        ...state,
        loading: false,
        list: action.payload.list,
      };

    case FETCH_LISTDEMO_FAILURE:
      // The request failed. It's done. So set loading to "false".
      // Save the error, so we can display it somewhere.
      // Since it failed, we don't have items to display anymore, so set `items` empty.
      //
      // This is all up to you and your app though:
      // maybe you want to keep the items around!
      // Do whatever seems right for your use case.
      return {
        ...state,
        loading: false,
        error: "FAILED TO LOAD,..,.", //action.payload.error,
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
