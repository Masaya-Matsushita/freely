import { FC } from 'react'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { Covid19Data } from 'src/type/Covid19Data'

const japanData = {
  errorInfo: {
    errorCode: null,
    errorFlag: '0',
    errorMessage: null,
  },
  itemList: [
    { date: '2022/09/25', infectedNum: '20,982,896' },
    { date: '2022/09/24', infectedNum: '20,982,000' },
    { date: '2022/09/23', infectedNum: '20,981,500' },
    { date: '2022/09/22', infectedNum: '20,981,000' },
    { date: '2022/09/21', infectedNum: '20,980,500' },
    { date: '2022/09/20', infectedNum: '20,982,896' },
    { date: '2022/09/19', infectedNum: '20,982,896' },
    { date: '2022/09/18', infectedNum: '20,982,896' },
    { date: '2022/09/17', infectedNum: '20,982,896' },
    { date: '2022/09/16', infectedNum: '20,982,896' },
    { date: '2022/09/15', infectedNum: '20,982,896' },
    { date: '2022/09/14', infectedNum: '20,982,896' },
    { date: '2022/09/13', infectedNum: '20,982,896' },
    { date: '2022/09/12', infectedNum: '20,982,896' },
    { date: '2022/09/11', infectedNum: '20,982,896' },
    { date: '2022/09/10', infectedNum: '20,982,896' },
    { date: '2022/09/9', infectedNum: '20,982,896' },
    { date: '2022/09/8', infectedNum: '20,982,896' },
    { date: '2022/09/7', infectedNum: '20,982,896' },
    { date: '2022/09/6', infectedNum: '20,982,896' },
    { date: '2022/09/5', infectedNum: '20,982,896' },
    { date: '2022/09/4', infectedNum: '20,982,896' },
    { date: '2022/09/3', infectedNum: '20,982,896' },
    { date: '2022/09/2', infectedNum: '20,982,896' },
    { date: '2022/09/1', infectedNum: '20,982,896' },
    { date: '2022/08/31', infectedNum: '20,982,896' },
    { date: '2022/08/30', infectedNum: '20,982,896' },
    { date: '2022/08/29', infectedNum: '20,982,896' },
    { date: '2022/08/28', infectedNum: '20,982,896' },
    { date: '2022/08/27', infectedNum: '20,982,896' },
    { date: '2022/08/26', infectedNum: '20,982,896' },
  ],
}

const prefData = {
  errorInfo: {
    errorCode: null,
    errorFlag: '0',
    errorMessage: null,
  },
  itemList: [
    { date: '2022/09/25', infectedNum: '82,896' },
    { date: '2022/09/24', infectedNum: '82,000' },
    { date: '2022/09/23', infectedNum: '81,500' },
    { date: '2022/09/22', infectedNum: '81,000' },
    { date: '2022/09/21', infectedNum: '80,500' },
    { date: '2022/09/20', infectedNum: '82,896' },
    { date: '2022/09/19', infectedNum: '82,896' },
    { date: '2022/09/18', infectedNum: '82,896' },
    { date: '2022/09/17', infectedNum: '82,896' },
    { date: '2022/09/16', infectedNum: '82,896' },
    { date: '2022/09/15', infectedNum: '82,896' },
    { date: '2022/09/14', infectedNum: '82,896' },
    { date: '2022/09/13', infectedNum: '82,896' },
    { date: '2022/09/12', infectedNum: '82,896' },
    { date: '2022/09/11', infectedNum: '82,896' },
    { date: '2022/09/10', infectedNum: '82,896' },
    { date: '2022/09/9', infectedNum: '82,896' },
    { date: '2022/09/8', infectedNum: '82,896' },
    { date: '2022/09/7', infectedNum: '82,896' },
    { date: '2022/09/6', infectedNum: '82,896' },
    { date: '2022/09/5', infectedNum: '82,896' },
    { date: '2022/09/4', infectedNum: '82,896' },
    { date: '2022/09/3', infectedNum: '82,896' },
    { date: '2022/09/2', infectedNum: '82,896' },
    { date: '2022/09/1', infectedNum: '82,896' },
    { date: '2022/08/31', infectedNum: '82,896' },
    { date: '2022/08/30', infectedNum: '82,896' },
    { date: '2022/08/29', infectedNum: '82,896' },
    { date: '2022/08/28', infectedNum: '82,896' },
    { date: '2022/08/27', infectedNum: '82,896' },
    { date: '2022/08/26', infectedNum: '82,896' },
  ],
}

/**
 * @package
 */
// export const Covid19: FC<{ data: Covid19Data }> = (props) => {
export const Covid19 = () => {
  // const japanData = props.data.covid19Japan
  // const prefData = props.data.covid19Pref

  return (
    <>
      <PrefSelectBox />
      <div className='space-y-4'>
        {japanData.errorInfo.errorFlag === '0' ? (
          <div>
            {japanData.itemList.map(({ date, infectedNum }) => {
              return (
                <div key={date}>
                  <div>{date}</div>
                  <div>{infectedNum}</div>
                </div>
              )
            })}
          </div>
        ) : null}
        {prefData.errorInfo.errorFlag === '0' ? (
          <div>
            {prefData.itemList.map(({ date, infectedNum }) => {
              return (
                <div key={date}>
                  <div>{date}</div>
                  <div>{infectedNum}</div>
                </div>
              )
            })}
          </div>
        ) : null}
      </div>
    </>
  )
}
