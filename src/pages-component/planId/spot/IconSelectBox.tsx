import { Select } from '@mantine/core'
import type { UseFormReturnType } from '@mantine/form'
import Image from 'next/image'
import { forwardRef, FC } from 'react'
import { SpotValues } from './page'

type Props = {
  largerThanMd: boolean
  updateActive: () => void
  form: UseFormReturnType<SpotValues>
}

type SelectItemProps = React.ComponentPropsWithoutRef<'div'> & {
  id: string
  image: string
  label: string
  description: string
}

const ICON_LIST = [
  {
    id: 'Spot',
    image: '/SpotIcon.svg',
    label: '観光',
    value: 'Spot',
    description: '史跡、娯楽、体験など',
  },

  {
    id: 'Restaurant',
    image: '/RestaurantIcon.svg',
    label: '食事',
    value: 'Restaurant',
    description: 'グルメ、カフェなど',
  },
  {
    id: 'Souvenir',
    image: '/SouvenirIcon.svg',
    label: '買い物',
    value: 'Souvenir',
    description: 'お土産、ショッピングなど',
  },
  {
    id: 'Hotel',
    image: '/HotelIcon.svg',
    label: '宿泊',
    value: 'Hotel',
    description: '旅館、ホテルなど',
  },
]

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, SelectItemProps>(
  ({ id, image, label, description, ...others }: SelectItemProps, ref) => (
    <div ref={ref} {...others}>
      <div className='flex items-center gap-4 py-1'>
        <Image src={image} alt='' height='25px' width='25px' />
        <div>
          <div className='text-base text-dark-500'>{label}</div>
          <div className='text-sm text-dark-300'>{description}</div>
        </div>
      </div>
    </div>
  ),
)

/**
 * @package
 */
export const IconSelectBox: FC<Props> = (props) => {
  return (
    <Select
      placeholder='アイコンを選択'
      itemComponent={SelectItem}
      data={ICON_LIST}
      clearable
      {...props.form.getInputProps('icon')}
      onBlur={props.updateActive}
      filter={(value, item) => item.id === value}
      maxDropdownHeight={400}
      size={props.largerThanMd ? 'md' : 'sm'}
      classNames={{ input: 'max-w-xs md:max-w-sm mt-6' }}
      styles={(theme) => ({
        item: {
          '&[data-selected]': {
            '&, &:hover': {
              backgroundColor: theme.colors.indigo[1],
              color: theme.colors.indigo[9],
            },
          },
        },
      })}
    />
  )
}
