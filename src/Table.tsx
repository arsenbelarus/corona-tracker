import React from "react";
import './Table.css';
import numeral from "numeral"
import {CountryFromServerType} from "./types";

type TablePropsType = {
  countries: CountryFromServerType[] | undefined
}

export const Table = (props: TablePropsType) => {
  return (
    <div className='table'>
      { props.countries && props.countries.map(country => (
        <tr>
          <td>
            {country.country}
          </td>
          <td>
            <strong>{numeral(country.cases).format("0,0")}</strong>
          </td>
        </tr>
      ))}
    </div>
  )
}