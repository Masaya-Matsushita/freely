import { IconCheck } from '@tabler/icons'
import { useMediaQuery } from 'src/lib/mantine'

const NOTES = [
  {
    key: 0,
    body: (
      <p className='my-0 text-xs leading-5 text-dark-500 md:text-sm'>
        <span className='mx-1 rounded-sm bg-main-300 px-1 py-[2px] font-bold text-main-500'>
          共有パスワード
        </span>
        はこの端末以外からプランを共同編集するときに利用します。設定しない場合、他の端末からプランに変更を加えることはできません。
      </p>
    ),
  },
  {
    key: 1,
    body: (
      <p className='my-0 text-xs leading-5 text-dark-500 md:text-sm'>
        プランは最終更新日から約
        <span className='mx-1 rounded-sm bg-main-300 px-1 py-[2px] font-bold text-main-500'>
          １年
        </span>
        で自動的に削除されます。
      </p>
    ),
  },
  {
    key: 2,
    body: (
      <p className='my-0 text-xs leading-5 text-dark-500 md:text-sm'>
        個人情報やクレジットカード番号など、公開すべきでない内容は書き込まないでください。
      </p>
    ),
  },
]

export const Notes = () => {
  const largerThanMd = useMediaQuery('md')

  return (
    <div className='mx-4 space-y-4 rounded-md bg-white px-4 pt-10 pb-8 shadow-sm shadow-dark-100 xxs:mx-6 xs:mx-auto xs:w-[550px] xs:space-y-3 sm:space-y-5 md:w-[650px] md:px-8 md:py-10'>
      {NOTES.map((note) => {
        return (
          <div key={note.key} className='flex items-start gap-1 md:gap-2'>
            <IconCheck
              color='#495057'
              size={largerThanMd ? 24 : 22}
              stroke={2.3}
              className='shrink-0'
            />
            {note.body}
          </div>
        )
      })}
    </div>
  )
}
