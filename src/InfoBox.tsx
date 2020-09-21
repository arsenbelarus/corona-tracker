import React from "react";
import {Card, CardContent, Typography} from "@material-ui/core";
import "./InfoBox.css";

type InfoBoxType = {
  title: string | undefined,
  cases: string | undefined,
  total: string | undefined,
  isRed?: boolean,
  active: boolean,
  onClick: () => void
}

export const InfoBox = (props: InfoBoxType) => {
  return (
    <Card onClick={props.onClick} className={`infoBox ${props.active && 'infoBox--selected'}`}>
      <CardContent>
        <Typography className='infoBox__title' color={'textSecondary'}> {props.title} </Typography>
        <h2 className={`'infoBox__cases' ${props.isRed ? 'infoBox__cases--red' : 'infoBox__cases--green'}`}> {props.cases} </h2>
        <Typography className='infoBox__total' color={'textSecondary'}> {props.total} Total </Typography>
      </CardContent>
    </Card>
  )
}