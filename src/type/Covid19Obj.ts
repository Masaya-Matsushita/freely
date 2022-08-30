type Covid19Data = {
  errorInfo: {
    errorFlag: string
    errorCode: string | null
    errorMessage: string | null
  }
  itemList: {
    date: string
    infectedNum: string
  }[]
}

export type Covid19Obj = {
  covid19Japan: Covid19Data
  covid19Hokkaido: Covid19Data
}
