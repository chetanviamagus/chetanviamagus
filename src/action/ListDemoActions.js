import DemoService from "../service/DemoService";

import {
  FETCH_LISTDEMO_BEGIN,
  FETCH_LISTDEMO_FAILURE,
  FETCH_LISTDEMO_SUCCESS,
} from "./1_ActionConstants";

export const fetchListBegin = () => ({
  type: FETCH_LISTDEMO_BEGIN,
});

export const fetchListSuccess = (list) => ({
  type: FETCH_LISTDEMO_SUCCESS,
  payload: { list },
});

export const fetchListFailure = (error) => ({
  type: FETCH_LISTDEMO_FAILURE,
  payload: { error },
});

export function fetchList() {
  return (dispatch, getState) => {
    //redux passes dispatch & getState as args into thunk functions
    dispatch(fetchListBegin());
    return DemoService.getAll()
      .then((res) => {
        dispatch(fetchListSuccess(res.data));
        return res.data;
      })
      .catch((error) => dispatch(fetchListFailure(error)));
  };
}

function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}
