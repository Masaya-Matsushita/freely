import { IconMist } from '@tabler/icons'
import { AiOutlineCloud } from 'react-icons/ai'
import {
  BsCloudDrizzle,
  BsCloudRainHeavyFill,
  BsLightningFill,
  BsQuestionCircleFill,
  BsSnow3,
} from 'react-icons/bs'
import { MdBrightnessHigh } from 'react-icons/md'

/**
 * @package
 */
export const getWeatherIcon = (type: string | number, small?: string) => {
  switch (type) {
    case 0:
    case 1:
    case '01d':
    case '01n':
    case '02d':
    case '02n':
      // 晴れ
      return <MdBrightnessHigh color='orange' size={small ? 36 : 80} />
    case 2:
    case 45:
    case '03d':
    case '03n':
      // 晴れ時々曇り
      return (
        <div className={`${small ? 'ml-4 -space-x-11' : '-space-x-28'}`}>
          <AiOutlineCloud color='gray' size={small ? 24 : 66} />
          <MdBrightnessHigh color='orange' size={small ? 28 : 66} />
        </div>
      )
    case 3:
    case 80:
    case '04d':
    case '04n':
      // 曇り
      return <AiOutlineCloud color='gray' size={small ? 36 : 80} />
    case 51:
    case 53:
    case 56:
    case 61:
    case 66:
    case 85:
    case '09d':
    case '09n':
      // 小雨
      return <BsCloudDrizzle color='gray' size={small ? 34 : 72} />
    case 63:
    case 65:
    case 67:
    case 81:
    case 82:
    case '10d':
    case '10n':
      // 雨
      return <BsCloudRainHeavyFill color='gray' size={small ? 34 : 72} />
    case 95:
    case 96:
    case 99:
    case '11d':
    case '11n':
      // 雷雨
      return (
        <div
          className={`flex flex-col items-center ${
            small ? '-space-y-3' : '-space-y-7'
          }`}
        >
          <BsCloudRainHeavyFill color='gray' size={small ? 32 : 72} />
          <BsLightningFill color='orange' size={small ? 20 : 36} />
        </div>
      )
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
    case '13d':
    case '13n':
      // 雪
      return <BsSnow3 color='lightgray' size={small ? 32 : 72} />
    case 48:
    case 55:
    case 57:
    case '50d':
    case '50n':
      // 霧
      return <IconMist size={small ? 36 : 72} color='lightgray' />
    default:
      return <BsQuestionCircleFill size={small ? 32 : 60} color='lightgray' />
  }
}

/**
 * @package
 */
export const getWeatherComment = (type: string | number) => {
  switch (type) {
    case 0:
      return '快晴'
    case 1:
      return '晴れ'
    case 2:
    case 45:
      return '晴れ 時々 曇り'
    case 3:
    case 80:
      return '曇り'
    case 51:
    case 53:
    case 56:
    case 61:
    case 66:
    case 85:
      return '小雨'
    case 63:
    case 65:
    case 67:
    case 81:
    case 82:
      return '雨'
    case 95:
    case 96:
    case 99:
      return '雷雨'
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return '雪'
    case 48:
    case 55:
    case 57:
      return '霧'
    default:
      return '取得エラー'
  }
}
