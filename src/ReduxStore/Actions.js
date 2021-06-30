import * as types from "./ActionTypes";

export function updateDateIntervalAction(payload) {
  return {
    type: types.UPDATE_DATE_INTERVAL,
    payload,
  };
}

export function updateDateIntervalActionSuccess(payload) {
    return {
      type: types.UPDATE_DATE_INTERVAL_SUCCESS,
      payload,
    };
  }

  export function addRequestCurrencyAction(payload) {
    return {
      type: types.ADD_REQUEST_CURRENCY,
      payload,
    }
  }

  export function removeRequestCurrencyAction(payload) {
    return {
      type: types.REMOVE_REQUEST_CURRENCY,
      payload,
    }
  }