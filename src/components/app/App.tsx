import React, {ChangeEvent, SetStateAction, useEffect, useState} from 'react';
import './App.css';
import {MenuItem} from "@material-ui/core";
import "leaflet/dist/leaflet.css";
import {CasesType, CountriesType, CountryFromServerType} from "../../utils/types";
import {sortData} from "../../utils/utils";
import {AppLeft} from "./app_left/App_Left";
import {AppRight} from "./app_right/App_Right";

const App = () => {
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
    const countryCode = e.target.value
    setSelectValue(countryCode)
    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then<CountryFromServerType>(response => response.json())
      .then(data => {
        if (countryCode !== 'worldwide') {
          setMapZoom(5)
          setMapCenter({lat: data.countryInfo.lat, lng: data.countryInfo.long})
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
      <AppLeft value={selectValue} onChange={onCountryChange} countries={countries}
                setCountriesToDropDown={country => <MenuItem value={country.value}>{country.name}</MenuItem>}
                casesType={casesType}
                onClickSetCases={() => setCasesType("cases")} countryInfo={countryInfo}
                onClickSetRecovered={() => setCasesType("recovered")} onClickSetDeaths={() => setCasesType("deaths")}
                center={mapCenter}
                zoom={mapZoom} countriesFromServer={mapCountries}/>
      <AppRight countries={tableData} casesType={casesType}/>
    </div>
  );
}

export default App;
