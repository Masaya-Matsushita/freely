/**
 * @package
 */
export const Footer = () => {
  return (
    <footer className='flex h-72 flex-col items-center justify-center gap-8 bg-dark-600 text-dark-100 sm:h-40 sm:flex-row'>
      <FooterLabel />
      <SystemRequirement />
    </footer>
  )
}

/**
 * @package
 */
export const FooterLabel = () => {
  return (
    <div className='flex flex-col items-center space-y-2'>
      <div className='text-lg tracking-wide'>Freely</div>
      <div className='text-xs'>(c) 2022 Matsushita Masaya</div>
    </div>
  )
}

/**
 * @package
 */
export const SystemRequirement = () => {
  return (
    <div className='mx-6 max-w-[440px] text-xs'>
      <div>推奨環境</div>
      <div>PC版 Google Chrome 最新版</div>
      <div>
        スマートフォン版 [iOS] Safari 最新版 / [Android] Google Chrome 最新版
      </div>
      <div>
        ※推奨環境以外でご覧いただいた場合、一部表示の崩れや機能が正常に動作しない場合があります。
      </div>
    </div>
  )
}
