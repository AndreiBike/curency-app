import React from "react";
import { connect } from "react-redux";
import TableMockup from "./TableMockup/TableMockup";
import { useState, useEffect } from "react";
import { updateDateIntervalAction } from "../ReduxStore/Actions";
import {CSVLink} from "react-csv";
import "./Table.css";

function filterCurencies(curencies, requestCurrencies) {
  return curencies.filter((curency) => {
    for (let requestCurrency of requestCurrencies) {
      if (curency.curAbbreviation === requestCurrency.curAbbreviation) {
        return false;
      }
    }
    return true;
  });
}

function preparingDataForTable(dynamicArray, requestCurrencies) {
  const preparedData = [];
  for (let i = 0; i < dynamicArray.length; i++) {
    for (let j = 0; j < dynamicArray[i].length; j++) {
      preparedData[j] = {
        ...preparedData[j],
        Date: dynamicArray[i][j].Date.substr(0, 10),
      };
      preparedData[j][requestCurrencies[i].curAbbreviation] =
        dynamicArray[i][j].Cur_OfficialRate;
    }
  }
  return preparedData;
}



const Table = ({
  dynamic,
  curencies,
  requestCurrencies,
  startDate,
  endDate,
  updateDateInterval,
}) => {
  const [selectedCurrency, changeCurrency] = useState(
    filterCurencies(curencies, requestCurrencies)[0]
  );

  useEffect(() => {
    changeCurrency(filterCurencies(curencies, requestCurrencies)[0]);
  }, [curencies, requestCurrencies]);

  const dataArray = preparingDataForTable(dynamic, requestCurrencies);

  const data = React.useMemo(() => [...dataArray], [dataArray]);

  const columns = React.useMemo(() => {
    const array = [
      {
        Header: "Date",
        accessor: "Date",
      },
    ];
    for (let requestCurrency of requestCurrencies) {
      array.push({
        Header: requestCurrency.curAbbreviation,
        accessor: requestCurrency.curAbbreviation,
      });
    }
    return array;
  }, [requestCurrencies]);

  const columnsForExport = React.useMemo(() => {
    const array = [
      {
        label: "Date",
        key: "Date",
      },
    ];
    for (let requestCurrency of requestCurrencies) {
      array.push({
        label: requestCurrency.curAbbreviation,
        key: requestCurrency.curAbbreviation,
      });
    }
    return array;
  }, [requestCurrencies]);

  console.dir(columnsForExport);
  console.dir(dataArray);

  const csvReport = {
    data: dataArray,
    headers: columnsForExport,
    filename: `Export_file_${new Date()}.csv`
  }

  return (
    <div className="table">
      <div className="table-buttons">
        <CSVLink {...csvReport}> Export to CSV </CSVLink>
        <br />
        {curencies.length !== requestCurrencies.length ? (
          <>
            <select
              onChange={(event) => {
                changeCurrency({ ...JSON.parse(event.target.value) });
              }}
            >
              {filterCurencies(curencies, requestCurrencies).map(
                (curency, id) => (
                  <option key={id} value={JSON.stringify(curency)}>
                    {curency.curAbbreviation}
                  </option>
                )
              )}
            </select>
            <button
              onClick={() => {
                updateDateInterval({
                  startDate,
                  endDate,
                  requestCurrencies: [...requestCurrencies, selectedCurrency],
                });
              }}
            >
              {" "}
              +{" "}
            </button>
          </>
        ) : (
          <> </>
        )}
        {requestCurrencies.length !== 1 ? (
          <button
            onClick={() => {
              const arr = [...requestCurrencies];
              arr.pop();
              updateDateInterval({
                startDate,
                endDate,
                requestCurrencies: arr,
              });
            }}
          >
            {" "}
            -{" "}
          </button>
        ) : (
          <></>
        )}
      </div>
      <div className="table-desighn"></div>
      <TableMockup columns={columns} data={data} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  dynamic: state.dynamicState,
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

export default connect(mapStateToProps, mapDispatchToProps)(Table);
