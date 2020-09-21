import React, {ChangeEvent, SetStateAction, useEffect, useState} from 'react';
import './App.css';
import {Card, CardContent, FormControl, MenuItem, Select} from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import {CasesType, CountriesType, CountryFromServerType} from "./types";
import {InfoBox} from "./InfoBox";
import {Map} from "./Map";
import {Table} from "./Table";
import {LineGraph} from "./LineGraph";
import {prettyStat, sortData} from "./utils";

function App() {
  const [countries, setCountries] = useState<CountriesType>([{name: '', value: ''}])
  const [selectValue, setSelectValue] = useState<SetStateAction<string | undefined | unknown>>('worldwide')
  const [countryInfo, setCountryInfo] = useState<CountryFromServerType>()
  const [tableData, setTableData] = useState<CountryFromServerType[]>()
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState<CountryFromServerType[]>([])
  const [casesType, setCasesType] = useState<CasesType>("cases")

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then<CountryFromServerType>(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then(response => response.json())
        .then(data => {
          const countriesFromServer: CountriesType = data.map((country: CountryFromServerType) => ({
            name: country.country,                // Full country name
            value: country.countryInfo.iso2       // BLR, PL, etc.
          }))
          setTableData(sortData(data))
          setMapCountries(data)
          setCountries(countriesFromServer)
        })
    }
    getCountriesData().then()
  }, [])

  const onCountryChange = async (e: ChangeEvent<{ name?: string | undefined; value: unknown; }>) => {
    debugger
    const countryCode = e.target.value
    setSelectValue(countryCode)
    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then<CountryFromServerType>(response => response.json())
      .then(data => {
        if (countryCode !== 'worldwide') {
          setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long})
          setMapZoom(5)
        } else {
          setMapCenter({lat: 34.80746, lng: -40.4796})
          setMapZoom(3)
        }
        setSelectValue(countryCode)
        setCountryInfo(data)
      })
  }

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1> Covid 19 tracker </h1>
          <FormControl className='app__dropdown'>
            <Select variant={"outlined"} value={selectValue} onChange={onCountryChange}>
              <MenuItem value={'worldwide'}> Worldwide </MenuItem>
              {
                countries.map(country => <MenuItem value={country.value}>{country.name}</MenuItem>)
              }
            </Select>
          </FormControl>
        </div>
        <div className="app__stats">
          <InfoBox title={'Coronavirus cases'}
                   active={casesType === "cases"}
                   isRed
                   onClick={() => setCasesType("cases")}
                   cases={countryInfo && prettyStat(countryInfo.todayCases)}
                   total={countryInfo && prettyStat(countryInfo.cases)}/>
          <InfoBox title={'Recovered'}
                   active={casesType === "recovered"}
                   onClick={() => setCasesType("recovered")}
                   cases={countryInfo && prettyStat(countryInfo.todayRecovered)}
                   total={countryInfo && prettyStat(countryInfo.recovered)}/>
          <InfoBox title={'Deaths'}
                   active={casesType === "deaths"}
                   isRed
                   onClick={() => setCasesType("deaths")}
                   cases={countryInfo && prettyStat(countryInfo.todayDeaths)}
                   total={countryInfo && prettyStat(countryInfo.deaths)}/>
        </div>
        <Map
          center={mapCenter}
          casesType={casesType}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>


      <Card className="app__right">
        <CardContent>
          <h3> Live Cases by Country </h3>
          <Table countries={tableData}/>
          <h3 className='app__graphTitle'> Worldwide new {casesType} </h3>
          <LineGraph
            className={'app__graph'}
            casesType={casesType}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
