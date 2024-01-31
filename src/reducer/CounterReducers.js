import { COUNT_BEGIN, COUNT_FAILURE, COUNT_SUCCESS } from "../action/1_ActionConstants";

const initialState = {
  loading: false,
  error: null,
  counterObj: { counter: 0 },
};

export default function CounterReducer(state = initialState, action) {
  switch (action.type) {
    case COUNT_BEGIN:
      // Mark the state as "loading" so we can show a spinner or something
      // Also, reset any errors. We're starting fresh.
      return {
        ...state,
        // loading: true,
        // error: null,
      };

    case COUNT_SUCCESS:
      // All done: set loading "false".
      // Also, replace the items with the ones from the server
      return {
        ...state,
        loading: false,
        counterObj: { ...action.payload },
      };

    case COUNT_FAILURE:
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
        counter: 0,
      };
    default:
      // ALWAYS have a default case in a reducer
      return state;
  }
}
