import {
  IconArrowDown,
  IconArrowDownLeft,
  IconArrowDownRight,
  IconArrowLeft,
  IconArrowRight,
  IconArrowUp,
  IconArrowUpLeft,
  IconArrowUpRight,
} from '@tabler/icons'

/**
 * @package
 */
export const getWindDirection = (deg: number) => {
  switch (true) {
    case 25 < deg && deg <= 70:
      return <IconArrowUpRight size={24} stroke={2.5} color='#6fa6ff' />
    case 70 < deg && deg <= 115:
      return <IconArrowRight size={24} stroke={2.5} color='#6fa6ff' />
    case 115 < deg && deg <= 160:
      return <IconArrowDownRight size={24} stroke={2.5} color='#6fa6ff' />
    case 160 < deg && deg <= 205:
      return <IconArrowDown size={24} stroke={2.5} color='#6fa6ff' />
    case 205 < deg && deg <= 250:
      return <IconArrowDownLeft size={24} stroke={2.5} color='#6fa6ff' />
    case 250 < deg && deg <= 295:
      return <IconArrowLeft size={24} stroke={2.5} color='#6fa6ff' />
    case 295 < deg && deg <= 340:
      return <IconArrowUpLeft size={24} stroke={2.5} color='#6fa6ff' />
    case 340 < deg:
    case deg <= 25:
      return <IconArrowUp size={24} stroke={2.5} color='#6fa6ff' />
    default:
      break
  }
}

/**
 * @package
 */
export const getWindComment = (deg: number) => {
  switch (true) {
    case 25 < deg && deg <= 70:
      return '北東'
    case 70 < deg && deg <= 115:
      return '東'
    case 115 < deg && deg <= 160:
      return '南東'
    case 160 < deg && deg <= 205:
      return '南'
    case 205 < deg && deg <= 250:
      return '南西'
    case 250 < deg && deg <= 295:
      return '西'
    case 295 < deg && deg <= 340:
      return '北西'
    case 340 < deg:
    case deg <= 25:
      return '北'
    default:
      break
  }
}
