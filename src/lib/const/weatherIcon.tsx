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
export const getWeatherIcon = (type: string | number) => {
  switch (type) {
    case 0:
    case 1:
    case '01d':
    case '01n':
    case '02d':
    case '02n':
      // 晴れ
      return <MdBrightnessHigh color='orange' size={60} />
    case 2:
    case '03d':
    case '03n':
      // 晴れ時々曇り
      return (
        <div className='relative'>
          <MdBrightnessHigh
            color='orange'
            size={52}
            className='absolute top-1 z-10'
          />
          <AiOutlineCloud color='gray' size={52} className='absolute left-9' />
        </div>
      )
    case 3:
    case '04d':
    case '04n':
      // 曇り
      return <AiOutlineCloud color='gray' size={60} />
    case 51:
    case 53:
    case 56:
    case 61:
    case 66:
    case 80:
    case 85:
    case '09d':
    case '09n':
      // 小雨
      return <BsCloudDrizzle color='gray' size={60} />
    case 63:
    case 65:
    case 67:
    case 81:
    case 82:
    case '10d':
    case '10n':
      // 雨
      return <BsCloudRainHeavyFill color='gray' size={60} />
    case 95:
    case 96:
    case 99:
    case '11d':
    case '11n':
      // 雷雨
      return (
        <div className='relative'>
          <BsCloudRainHeavyFill color='gray' size={60} className='absolute' />
          <BsLightningFill
            color='orange'
            size={32}
            className='absolute top-9 left-4'
          />
        </div>
      )
    case 45:
    case 48:
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
    case '13d':
    case '13n':
      // 雪
      return <BsSnow3 color='lightgray' size={60} />
    case 55:
    case 57:
    case '50d':
    case '50n':
      // 霧
      return <IconMist size={60} color='lightgray' />
    default:
      return <BsQuestionCircleFill size={60} color='lightgray' />
  }
}
