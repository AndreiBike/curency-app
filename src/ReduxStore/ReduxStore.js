import {createStore, combineReducers,applyMiddleware} from "redux";
import { controlReducer } from "./Reducers/ControlReducer";
import {currenciesReducer} from "./Reducers/CurrenciesReucer";
import { dynamicReducer } from "./Reducers/DynamicReducer";
import createSagaMiddleware from "redux-saga";
import { getDynamicSaga } from "./ReduxSaga";

const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    currenciesState: currenciesReducer,
    dynamicState: dynamicReducer,
    controlState: controlReducer
}) 

const reduxStore = createStore(reducers, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(getDynamicSaga);

export default reduxStore;