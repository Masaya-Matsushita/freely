/**
 * @package
 */
export const getDayOfWeek = (year: number, month: number, day: number) => {
  // 指定した日の曜日を返す
  const dayOfWeekList = ['日', '月', '火', '水', '木', '金', '土']
  const date = new Date(year, month - 1, day)
  return dayOfWeekList[date.getDay()]
}
