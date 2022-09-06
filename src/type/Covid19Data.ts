type Covid19 = {
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

export type Covid19Data = {
  covid19Japan: Covid19
  covid19Pref: Covid19
}
