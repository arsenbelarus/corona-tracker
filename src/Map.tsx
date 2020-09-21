import React from "react";
import "./Map.css"
import {Map as LeafletMap, TileLayer} from "react-leaflet"
import {CasesType, CountryFromServerType} from "./types";
import {showDataOnMap} from "./utils";


type MapPropsType = {
  center: {lat: number, lng: number},
  zoom: number,
  countries: CountryFromServerType[],
  casesType: CasesType
}

export const Map = (props: MapPropsType) => {
  return (
    <div className='map'>
      <LeafletMap center={props.center} zoom={props.zoom}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {showDataOnMap(props.countries, props.casesType)}
      </LeafletMap>
    </div>
  )
}