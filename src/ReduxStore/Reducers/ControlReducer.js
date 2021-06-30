import * as types from "../ActionTypes";
import { parseDate, todayDate, prevWeekDate } from "../../Features/ParseDate";

const initialState = {
  startDate: parseDate(prevWeekDate),
  endDate: parseDate(todayDate),
  requestCurrencies: [
    {
      curId: 145,
      curAbbreviation: "USD",
    },
  ],
};

export function controlReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_DATE_INTERVAL_SUCCESS:
      return {
        ...state,
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        requestCurrencies: action.payload.requestCurrencies,
      };

      case types.ADD_REQUEST_CURRENCY:
        return {
          ...state,
          requestCurrencies: action.payload.requestCurrencies,
        }
        
      case types.REMOVE_REQUEST_CURRENCY:
        return {
          ...state,
          requestCurrencies: action.payload.requestCurrencies,
        }
    default:
      return state;
  }
}
