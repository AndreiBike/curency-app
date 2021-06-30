import React from "react";
import { Line } from "react-chartjs-2";
import { connect } from "react-redux";
import "./Diagram.css";

const Diagram = ({ dynamic }) => {
  const datas = [];
  const labels = [];

  for (let elem of dynamic[0]) {
    datas.push(elem.Cur_OfficialRate);
    labels.push(elem.Date.substr(0, 10));
  }

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Currency diagramm",
        data: datas,
        fill: true,
        backgroundColor: "#e2e2e2",
      },
    ],
  };

  return (
    <div className="diagram">
      <Line data={data} />
    </div>
  );
};

const mapStateToProps = (state) => ({
  dynamic: state.dynamicState,
});

export default connect(mapStateToProps)(Diagram);
