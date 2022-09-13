/**
 * @package
 */
export const formatDate = (date: Date | null) => {
  if (date) {
    // dateをYYYY/MM/DDの文字列に変換
    const y = date.getFullYear()
    const m = ('00' + (date.getMonth() + 1)).slice(-2)
    const d = ('00' + date.getDate()).slice(-2)
    const strDate = y + '/' + m + '/' + d
    return strDate
  }
}
