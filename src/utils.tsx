import React from "react";
import {CasesType, CasesTypeColorType, CountryFromServerType, LineGraphFromServerType} from "./types";
import numeral from "numeral";
import {Circle, Popup} from "react-leaflet";

export const sortData = (data: CountryFromServerType[]) => {
  return [...data].sort((a, b) => a.cases > b.cases ? -1 : 1)
}

export const buildChartData = (data: LineGraphFromServerType, cases: CasesType) => {
  debugger
  const chartData = []
  let lastDataPoint: number | null = null
  for (let date in data[cases]) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[cases][date] - lastDataPoint
      }
      chartData.push(newDataPoint)
    }
    lastDataPoint = data[cases][date]
  }
  return chartData
}

export const options = {
  legend: {
    display: false
  },
  elements: {
    point: {
      radius: 0
    }
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem: any, data: any) {
        return numeral(tooltipItem.value).format("+0,0")
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll"
        },
      },
    ],
    yAxes: [
      {
        gridlines: {
          display: false
        },
        ticks: {
          callback: function (value: any, index: any, values: any) {
            return numeral(value).format("0a")
          }
        }
      }
    ]
  }
}

const casesTypeColor: CasesTypeColorType = {
  cases: {
    hex: "red",
    multiplier: 600
  },
  recovered: {
    hex: "green",
    multiplier: 1200
  },
  deaths: {
    hex: "red",
    multiplier: 2000
  }
}

export const showDataOnMap = (data: Array<CountryFromServerType>, casesType: CasesType) => {
  debugger
  return data.map(country => (
    <Circle center={[country.countryInfo.lat, country.countryInfo.long]}
            fillOpacity={0.4}
            color={casesTypeColor[casesType].hex}
            fillColor={casesTypeColor[casesType].hex}
            radius={
              Math.sqrt(+country[casesType]) * casesTypeColor[casesType].multiplier
            }>
      <Popup>
        <div className='info__container'>
          <div className='info__flag' style={{backgroundImage: `url(${country.countryInfo.flag})`}}/>
          <div className='info__name'> {country.country} </div>
          <div className='info__confirmed'> Cases: {numeral(country.cases).format("0,0")} </div>
          <div className='info__recovered'> Recovered: {numeral(country.recovered).format("0,0")} </div>
          <div className='info__deaths'> Deaths: {numeral(country.deaths).format("0,0")} </div>
        </div>
      </Popup>
    </Circle>
  ))
}

export const prettyStat = (stat: number) => stat ? `+${numeral(stat).format("0.0a")}` : `+0`