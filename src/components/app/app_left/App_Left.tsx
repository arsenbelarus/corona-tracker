import React from "react";
import {CountryFromServerType} from "../../../utils/types";
import {FormControl, MenuItem, Select} from "@material-ui/core";
import {InfoBox} from "../../infoBox/InfoBox";
import {prettyStat} from "../../../utils/utils";
import {Map} from "../../map/Map";

type AppLeftPropsType = {
  value: unknown,
  onChange: (e: React.ChangeEvent<{ name?: string | undefined; value: unknown }>) => Promise<void>,
  countries: [{ name: string; value: string }],
  setCountriesToDropDown: (country: { name: string; value: string }) => JSX.Element,
  casesType: "cases" | "recovered" | "deaths",
  onClickSetCases: () => void,
  onClickSetRecovered: () => void,
  onClickSetDeaths: () => void,
  countryInfo: CountryFromServerType | undefined,
  center: { lng: number; lat: number },
  zoom: number,
  countriesFromServer: CountryFromServerType[]
}

export const AppLeft = (props: AppLeftPropsType) => {
  return <div className="app__left">
    <div className="app__header">
      <h1> Covid 19 tracker </h1>
      <FormControl className='app__dropdown'>
        <Select variant={"outlined"} value={props.value} onChange={props.onChange}>
          <MenuItem value={"worldwide"}> Worldwide </MenuItem>
          {
            props.countries.map(props.setCountriesToDropDown)
          }
        </Select>
      </FormControl>
    </div>
    <div className="app__stats">
      <InfoBox title={"Coronavirus cases"}
               active={props.casesType === "cases"}
               isRed
               onClick={props.onClickSetCases}
               cases={props.countryInfo && prettyStat(props.countryInfo.todayCases)}
               total={props.countryInfo && prettyStat(props.countryInfo.cases)}/>
      <InfoBox title={"Recovered"}
               active={props.casesType === "recovered"}
               onClick={props.onClickSetRecovered}
               cases={props.countryInfo && prettyStat(props.countryInfo.todayRecovered)}
               total={props.countryInfo && prettyStat(props.countryInfo.recovered)}/>
      <InfoBox title={"Deaths"}
               active={props.casesType === "deaths"}
               isRed
               onClick={props.onClickSetDeaths}
               cases={props.countryInfo && prettyStat(props.countryInfo.todayDeaths)}
               total={props.countryInfo && prettyStat(props.countryInfo.deaths)}/>
    </div>
    <Map
      center={props.center}
      casesType={props.casesType}
      zoom={props.zoom}
      countries={props.countriesFromServer}
    />
  </div>;
}