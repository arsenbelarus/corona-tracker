export type CountryFromServerType = {
  updated: number,
  country: string,
  countryInfo: CountryInfoType,
  cases: number,
  todayCases: number,
  deaths: number,
  todayDeaths: number,
  recovered: number,
  todayRecovered: number,
  active: number,
  critical: number,
  casesPerOneMillion: number,
  deathsPerOneMillion: number,
  tests: number,
  testsPerOneMillion: number,
  population: number,
  continent: number,
  oneCasePerPeople: number,
  oneDeathPerPeople: number,
  oneTestPerPeople: number,
  activePerOneMillion: number,
  recoveredPerOneMillion: number,
  criticalPerOneMillion: number
}


type CountryInfoType = {
  id: number,
  iso2: string,
  iso3: string,
  lat: number,
  long: number,
  flag: string
}

export type CountriesType = [
  {
    name: string,
    value: string
  }
]

export type LineGraphFromServerType = {
  cases: LineGraphKeyType,
  deaths: LineGraphKeyType,
  recovered: LineGraphKeyType
}

type LineGraphKeyType = {
  [key: string]: number
}

export type CasesTypeColorType = {
  [key: string]:
    {
      hex: string,
      multiplier: number
    }
}

export type CasesType = "cases" | "recovered" | "deaths"