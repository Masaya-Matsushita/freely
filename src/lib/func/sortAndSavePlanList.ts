type Plan = { id: string; password: string }

/**
 * @package
 */
export const sortAndSavePlanList = (id: string, password: string) => {
  const planListStr = localStorage.getItem('planList')
  if (planListStr) {
    // 端末で別のプランを編集したことがある場合
    // 「現在のplanを先頭とする配列」へ並べ替え、保存
    const prevList: Plan[] = JSON.parse(planListStr)
    const trimmedList = prevList.filter((plan) => plan.id !== id)
    const newList = [{ id, password }, ...trimmedList]
    localStorage.setItem('planList', JSON.stringify(newList))
  } else {
    // 端末で初めてプランを編集する場合
    localStorage.setItem(
      'planList',
      JSON.stringify([{ id, password }]),
    )
  }
}
