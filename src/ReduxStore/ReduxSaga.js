import * as types from "./ActionTypes";
import { call, takeEvery, put } from "@redux-saga/core/effects";
import { updateDateIntervalActionSuccess } from "./Actions";

async function getDynamicFromInet({ startDate, endDate, requestCurrency}) {
  const response = await fetch(
    `https://www.nbrb.by/API/ExRates/Rates/Dynamics/${requestCurrency.curId}?startDate=${startDate}&endDate=${endDate}`
  );
  return response.json();
}

export function* getDynamicSaga() {
  yield takeEvery(types.UPDATE_DATE_INTERVAL, getDynamicAsync);
}

export function* getDynamicAsync(action) {
  try {
    const allResponces= [];
    for (let requestCurrency of action.payload.requestCurrencies) {
      let response = yield call(() => getDynamicFromInet({...action.payload, requestCurrency}));
      allResponces.push(response);
    }
    yield put(
      updateDateIntervalActionSuccess({
        startDate: action.payload.startDate,
        endDate: action.payload.endDate,
        dynamicArray: allResponces,
        requestCurrencies: action.payload.requestCurrencies,
      })
    );
  } catch (e){
    console.error(e.message);
  }
}
