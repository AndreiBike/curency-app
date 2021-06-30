import * as types from "../ActionTypes";

const initialState = [
  {
    curId: 145,
    curAbbreviation: "USD",
  },

  {
    curId: 292,
    curAbbreviation: "EUR",
  },

  {
    curId: 298,
    curAbbreviation: "RUB",
  },
];

export function currenciesReducer(state = initialState, action) {
  switch (action.type) {
    case types.UPLOAD_CURRENCIES:
      return [...state];

    default:
      return state;
  }
}
