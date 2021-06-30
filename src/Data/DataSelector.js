import React from "react";
import { connect } from "react-redux";
import { updateDateIntervalAction } from "../ReduxStore/Actions";
import { MIN_DATE, MAX_DATE } from "../Features/ParseDate";
import { useEffect } from "react";
import "./DataSelector.css";

const DataSelector = ({
  startDate,
  endDate,
  requestCurrencies,
  updateDateInterval,
}) => {
  useEffect(() => {
    updateDateInterval({ startDate, endDate, requestCurrencies});
  }, []);

  return (
    <section className="date-input">
      <div className="start-date-block">
        <label>Start date</label>
        <input
          max={endDate}
          min={MIN_DATE}
          value={startDate}
          id="start-date"
          type="date"
          onChange={(event) => {
            updateDateInterval({
              startDate: event.target.value,
              endDate,
              requestCurrencies,
            });
          }}
        />
      </div>
      <div className="end-date-block">
        <label>End date</label>
        <input
          max={MAX_DATE}
          min={startDate}
          value={endDate}
          id="end-date"
          type="date"
          onChange={(event) => {
            updateDateInterval({
              startDate,
              endDate: event.target.value,
              requestCurrencies,
            });
          }}
        />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  startDate: state.controlState.startDate,
  endDate: state.controlState.endDate,
  requestCurrencies: state.controlState.requestCurrencies,
});

const mapDispatchToProps = (dispatch) => ({
  updateDateInterval: (date) => {
    dispatch(updateDateIntervalAction(date));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(DataSelector);
