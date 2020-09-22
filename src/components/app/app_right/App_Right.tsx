import {CountryFromServerType} from "../../../utils/types";
import {Card, CardContent} from "@material-ui/core";
import {Table} from "../../table/Table";
import {LineGraph} from "../../lineGraph/LineGraph";
import React from "react";

type AppRightPropsType = {
  countries: CountryFromServerType[] | undefined,
  casesType: "cases" | "recovered" | "deaths",
}

export const AppRight = (props: AppRightPropsType) => {
  return (
    <Card className="app__right">
      <CardContent>
        <h3> Live Cases by Country </h3>
        <Table countries={props.countries}/>
        <h3 className='app__graphTitle'> Worldwide new {props.casesType} </h3>
        <LineGraph
          className={"app__graph"}
          casesType={props.casesType}
        />
      </CardContent>
    </Card>
)
}