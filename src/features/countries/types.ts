export interface Country {
  name: {
    common: string
    official: string
  }
  population: number
  region: string
  capital?: string[]
  flags: {
    svg: string
  }
  cca3: string
  subregion?: string
  languages?: { [key: string]: string }
  currencies?: {
    [key: string]: {
      name: string
      symbol?: string
    }
  }
  borders?: string[]
}
