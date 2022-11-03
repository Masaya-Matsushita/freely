export type Covid19Data = {
  errorInfo: {
    errorFlag: string
    errorCode: string | null
    errorMessage: string | null
  }
  itemList: {
    date: string
    infectedNum: number
  }[]
}
