import { COUNT_BEGIN, COUNT_FAILURE, COUNT_SUCCESS } from "./1_ActionConstants";

export const counterBegin = () => ({
  type: COUNT_BEGIN,
});

export const counterSuccess = (countValue) => ({
  type: COUNT_SUCCESS,
  payload: countValue,
});

export const counterFailure = (error) => ({
  type: COUNT_FAILURE,
  payload: { error },
});

export function updateCount(count) {
  return (dispatch, getState) => {
    //redux passes dispatch & getState as args into thunk functions
    dispatch(counterBegin());
    if (count) {
      dispatch(counterSuccess(count));
      return true;
    } else {
      dispatch(counterFailure("error"));
      return false;
    }
  };
}
