import * as types from "../ActionTypes";

const initialState = [[]];

export function dynamicReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_DATE_INTERVAL_SUCCESS:
      return [...action.payload.dynamicArray];
    default:
      return state;
  }
}
