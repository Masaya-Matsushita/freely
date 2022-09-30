import { IconAlertCircle } from '@tabler/icons'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { Line } from 'react-chartjs-2'
import { useRecoilValue } from 'recoil'
import { PrefSelectBox } from 'src/component/PrefSelectBox'
import { prefList } from 'src/lib/const'
import { useMediaQuery } from 'src/lib/mantine'
import { prefIdState } from 'src/state/prefId'
import { Covid19Data } from 'src/type/Covid19Data'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
)

// 新規感染者数の7日間平均の配列
const averageInfectedNumList = (list: number[]) => {
  let sum = 0
  return list.map((item, index) => {
    if (index < 7) {
      sum += item
      return 0
    } else {
      sum -= list[index - 7]
      sum += item
    }
    return Math.floor(sum / 7)
  })
}

/**
 * @package
 */
export const Covid19: FC<{ data: Covid19Data }> = (props) => {
  const router = useRouter()
  const largerThanXs = useMediaQuery('xs')
  const prefId = useRecoilValue(prefIdState)
  const japanData = props.data.covid19Japan
  const prefData = props.data.covid19Pref

  // パスのクエリにplanIdが無いとき
  if (router.isReady && !router.query.plan_id) {
    throw new Error(
      '不正なパス遷移として検出されました。Top画面から入り直してください。',
    )
  }

  // 全国の新規感染者数の7日間平均
  const japanAverageInfectedNumList = averageInfectedNumList(
    japanData.itemList.map((item) => item.infectedNum),
  ).slice(7)

  // 都道府県の新規感染者数の7日間平均
  const prefAverageInfectedNumList = averageInfectedNumList(
    prefData.itemList.map((item) => item.infectedNum),
  ).slice(7)

  // グラフの詳細設定
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        font: {
          size: largerThanXs ? 18 : 14,
        },
        text: '新型コロナウイルス新規感染者数推移（7日間平均）',
      },
      legend: {
        labels: {
          padding: largerThanXs ? 20 : 8,
          font: {
            size: largerThanXs ? 15 : 12,
          },
        },
      },
      tooltip: {
        padding: largerThanXs ? 20 : 5,
        titleFont: { size: largerThanXs ? 15 : 12 },
        bodyFont: { size: largerThanXs ? 12 : 10 },
        titleMarginBottom: largerThanXs ? 10 : 6,
        backgroundColor: '#f8f9fae6',
        titleColor: '#000',
        bodyColor: '#000',
        displayColors: true,
      },
    },
    scales: {
      y: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }

  // グラフの横軸ラベル（月日）
  const labels = japanData.itemList.map((item) => item.date.slice(5)).slice(7)

  // グラフのデータ
  const data = {
    labels,
    datasets: [
      {
        label: prefList[Number(prefId) - 1].name,
        data: prefAverageInfectedNumList,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        pointRadius: largerThanXs ? 3 : 1,
        yAxisID: 'y',
      },
      {
        label: '全国',
        data: japanAverageInfectedNumList,
        borderColor: '#7779e4',
        backgroundColor: '#7779e480',
        pointRadius: largerThanXs ? 3 : 1,
        yAxisID: 'y1',
      },
    ],
  }

  return (
    <>
      <PrefSelectBox />
      {prefData.errorInfo.errorFlag === '0' ? (
        <div className='mx-3 mt-8 w-[calc(100vw-24px)] max-w-[900px] rounded-lg bg-[#fdfdfd] py-2 xs:mx-6 xs:w-[calc(100vw-48px)] xs:p-4 sm:w-[calc(100vw-300px)] md:mx-auto md:w-[calc(100vw-380px)] md:p-6'>
          <Line height={200} options={options} data={data} />
        </div>
      ) : (
        <div className='mx-3 mt-8 flex h-[240px] w-[calc(100vw-24px)] max-w-[800px] items-center justify-center gap-1 rounded-lg bg-[#d8d8dd] xs:mx-6 xs:h-[360px] xs:w-[calc(100vw-48px)] sm:w-[calc(100vw-300px)] md:mx-auto md:w-[calc(100vw-380px)] lg:h-[440px]'>
          <IconAlertCircle color='#dd2222' stroke={1.4} />
          <div>データの取得に失敗しました。</div>
        </div>
      )}
    </>
  )
}
