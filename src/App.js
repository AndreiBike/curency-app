import React from "react";
import Diagram from "./Diagram/Diagram";
import Currency from "./Currency/Currency";
import DataSelector from "./Data/DataSelector";
import { Provider } from "react-redux";
import { useState } from "react";
import reduxStore from "./ReduxStore/ReduxStore";
import Table from "./Table/Table";
import "./App.css";

function App() {
  const [isTableMode, changeMode] = useState(false);

  return (
    <Provider store={reduxStore}>
      <div className="App">
        <h2> Hallo World </h2>
        <DataSelector />
        <button
          onClick={() => {
            changeMode(!isTableMode);
          }}
        >
          {isTableMode ? "Table mode" : "Diagram mode"}{" "}
        </button>
        {isTableMode ? (
          <Table />
        ) : (
          <>
            {" "}
            <Currency /> <Diagram />{" "}
          </>
        )}
      </div>
    </Provider>
  );
}

export default App;
