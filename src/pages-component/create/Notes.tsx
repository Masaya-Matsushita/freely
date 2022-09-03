import { IconCheck } from '@tabler/icons'
import { useMediaQuery } from 'src/lib/mantine'

const NOTES = [
  {
    key: 0,
    body: (
      <p className='my-0 text-xs leading-5 text-dark-500 md:text-sm'>
        旅行のテーマ、日程はプラン作成後も変更いただけます。
      </p>
    ),
  },
  {
    key: 1,
    body: (
      <p className='my-0 text-xs leading-5 text-dark-500 md:text-sm'>
        <span className='mx-1 rounded-sm bg-main-300 px-1 py-[2px] font-bold text-main-500'>
          共有パスワード
        </span>
        はこの端末以外からしおりを編集するときに利用します。他の端末・他の誰かと共同編集したいときなどに使いますので忘れないようにしてください。
      </p>
    ),
  },
  {
    key: 2,
    body: (
      <p className='my-0 text-xs leading-5 text-dark-500 md:text-sm'>
        メールアドレスを登録しておくと、共有パスワードを忘れた場合に
        <span className='mx-[2px] rounded-sm bg-main-300 px-1 py-[2px] font-bold text-main-500'>
          再設定用のメール
        </span>
        を送信できます。
      </p>
    ),
  },
  {
    key: 3,
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
    key: 4,
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
    <div className='mx-4 space-y-4 rounded-md bg-white py-8 px-4 shadow-sm shadow-dark-100 xs:mx-auto xs:w-[550px] xs:space-y-3 sm:space-y-5 md:w-[650px] md:px-8 md:py-14'>
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
