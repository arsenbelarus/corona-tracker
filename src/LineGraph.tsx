import React, {useEffect, useState} from "react";
import {Line} from "react-chartjs-2";
import {CasesType, LineGraphFromServerType} from "./types";
import {buildChartData, options} from "./utils";

type LineGraphType = {
  casesType: CasesType,
  className: string
}

export const LineGraph = (props: LineGraphType) => {
  const [graphData, setGraphData] = useState()

  useEffect(() => {
    const fetchChartData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120')
        .then(response => response.json())
        .then((data: LineGraphFromServerType) => setGraphData(buildChartData(data, props.casesType)))
    }
    fetchChartData().then()
  }, [props.casesType])

  return (
    <div className={props.className}>
      {
        graphData?.length > 0 &&
        <Line
            options={options}
            data={{
              datasets: [
                {
                  backgroundColor: `${props.casesType === "recovered" ? "rgba(0, 128, 0, .4)" : "rgba(204, 16, 52, .8)"}`,
                  borderColor: `${props.casesType === "recovered" ? "green" : "#CC1034"}`,
                  data: graphData
                }
              ]
            }}
        />
      }

    </div>
  )
}