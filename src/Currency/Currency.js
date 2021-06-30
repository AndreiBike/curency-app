import React from "react";
import { connect } from "react-redux";

import { updateDateIntervalAction } from "../ReduxStore/Actions";
import "./Currency.css";

const Currency = ({
  curencies,
  startDate,
  endDate,
  updateDateInterval,
  requestCurrencies,
}) => {
  return (
    <div className="currency">
      <label> Currency </label>
      <select
        value={JSON.stringify(requestCurrencies[0])}
        onChange={(event) => {
          updateDateInterval({
            startDate,
            endDate,
            requestCurrencies: [{...JSON.parse(event.target.value)}],
          });
        }}
        id="currency-select"
      >
        {curencies.map((curency, id) => (
          <option key={id} value={JSON.stringify(curency)}> {curency.curAbbreviation} </option>
        ))}
      </select>
    </div>
  );
};

const mapStateToProps = (state) => ({
  curencies: state.currenciesState,
  startDate: state.controlState.startDate,
  endDate: state.controlState.endDate,
  requestCurrencies: state.controlState.requestCurrencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateDateInterval: (date) => {
    dispatch(updateDateIntervalAction(date));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Currency);
