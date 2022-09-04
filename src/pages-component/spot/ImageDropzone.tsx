import { Button, CloseButton, Modal, Slider } from '@mantine/core'
import { Dropzone } from '@mantine/dropzone'
import {
  useDisclosure,
  useMediaQuery as useOriginalMediaQuery,
} from '@mantine/hooks'
import { IconPhoto } from '@tabler/icons'
import { useState } from 'react'
import type { Area, MediaSize } from 'react-easy-crop'
import Cropper from 'react-easy-crop'
import { useErrorHandler } from 'react-error-boundary'
import { useMediaQuery } from 'src/lib/mantine'

// urlをもとにimage要素を作成
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.src = url
  })

// 画像トリミングを行い新たな画像urlを作成
const getCroppedImg = async (
  imageSrc: string,
  pixelCrop: Area,
): Promise<string> => {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return ''
  }
  // canvasサイズを設定
  canvas.width = image.width
  canvas.height = image.height
  // canvas上に画像を描画
  ctx.drawImage(image, 0, 0)
  // トリミング後の画像を抽出
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
  )
  // canvasのサイズ指定(切り取り後の画像サイズに更新)
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  // 抽出した画像データをcanvasの左隅に貼り付け
  ctx.putImageData(data, 0, 0)

  // canvasを画像(Base64)に変換
  return canvas.toDataURL('image/jpeg')
}

/**
 * @package
 */
export const ImageDropzone = () => {
  const [croppedImgSrc, setCroppedImgSrc] = useState('')
  const [imgSrc, setImgSrc] = useState('')
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [minZoom, setMinZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>()
  const [opened, handler] = useDisclosure(false)
  const handleError = useErrorHandler()
  const largerThanXxs = useMediaQuery('xxs')
  const largerThanXs = useMediaQuery('xs')
  const largerThan490 = useOriginalMediaQuery('(min-width: 490px)')

  // 16:9のトリミング領域
  const ASPECT_RATIO = 16 / 9

  // 画面幅に合わせてトリミングサイズを指定
  let cropWidth = 210

  if (largerThanXs) {
    cropWidth = 400
  } else if (largerThan490) {
    cropWidth = 300
  } else if (largerThanXxs) {
    cropWidth = 240
  }

  // 画像ファイルをアップロードしてモーダルに表示
  const onFileChange = async (files: File[]) => {
    try {
      if (files && files.length > 0) {
        const reader = new FileReader()
        reader.addEventListener('load', () => {
          if (reader.result) {
            setImgSrc(reader.result.toString() || '')
            handler.open()
          }
        })
        // 画像をBase64エンコード
        reader.readAsDataURL(files[0])
      }
    } catch (error) {
      handleError(error)
    }
  }

  // 画像のZoomデフォルト値を設定
  const onMediaLoaded = (mediaSize: MediaSize) => {
    const { width, height } = mediaSize
    const mediaAspectRadio = width / height
    // 画像のアスペクト比が大きい(画像が横長)の場合
    if (mediaAspectRadio > ASPECT_RATIO) {
      // 縦幅に合わせてZoomのデフォルト値を指定
      const result = cropWidth / ASPECT_RATIO / height
      setZoom(result)
      setMinZoom(result)
      return
    }
    // 横幅に合わせてZoomのデフォルト値を指定
    const result = cropWidth / width
    setZoom(result)
    setMinZoom(result)
  }

  // 画像の切り取り情報を更新
  // ユーザーが画像の移動やZoomの操作をやめたときに呼ばれる
  const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  // 切り取った画像のプレビューを表示
  const showCroppedImage = async () => {
    if (!croppedAreaPixels) return
    try {
      const croppedImage = await getCroppedImg(imgSrc, croppedAreaPixels)
      setCroppedImgSrc(croppedImage)
      handler.close()
    } catch (error) {
      handleError(error)
    }
  }

  return (
    <div>
      {/* 画像トリミング用モーダル */}
      <Modal
        opened={opened}
        onClose={() => handler.close()}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        size='lg'
        classNames={{
          modal: 'bg-main-100 xxs:mx-3 mt-16',
        }}
      >
        <div className='relative mt-2 h-52 bg-dark-300 xs:mx-4 xs:mt-4 xs:h-[300px]'>
          <Cropper
            image={imgSrc}
            crop={crop}
            zoom={zoom}
            minZoom={minZoom}
            maxZoom={minZoom + 3}
            aspect={ASPECT_RATIO}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            cropSize={{
              width: cropWidth,
              height: cropWidth / ASPECT_RATIO,
            }}
            onMediaLoaded={onMediaLoaded}
            showGrid={true}
          />
        </div>
        <div className='mx-2 mt-4 max-w-sm xs:mx-auto'>
          <div className='ml-1'>Zoom</div>
          <Slider
            size='lg'
            value={zoom}
            onChange={setZoom}
            min={minZoom}
            max={minZoom + 3}
            step={0.1}
            label={null}
            marks={[
              { value: minZoom, label: '×1' },
              { value: minZoom + 1.5, label: '×2.5' },
              { value: minZoom + 3, label: '×4' },
            ]}
          />
        </div>
        <div className='mx-2 mt-16 mb-6 flex justify-end gap-4 xs:mr-8 xs:gap-6'>
          <Button
            color='red'
            variant='outline'
            onClick={() => handler.close()}
            className='h-10 w-24 font-bold xs:h-11 xs:w-36'
          >
            Cancel
          </Button>
          <Button
            onClick={showCroppedImage}
            className='h-10 w-24 font-bold xs:h-11 xs:w-36'
          >
            OK
          </Button>
        </div>
      </Modal>
      {croppedImgSrc ? (
        <div className='max-w-xs md:max-w-sm'>
          <div className='flex items-end justify-between text-dark-500'>
            <div className='ml-1 text-xs text-dark-500 xxs:text-sm'>
              設定中の写真
            </div>
            <CloseButton
              size={largerThan490 ? 'md' : 'sm'}
              iconSize={largerThan490 ? 22 : 20}
              onClick={() => setCroppedImgSrc('')}
            />
          </div>
          <div className='rounded-md border-solid border-slate-200 p-[3px] xs:p-1.5'>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={croppedImgSrc}
              alt='画像の描画に失敗しました。'
              className='h-full w-full rounded-md'
            />
          </div>
        </div>
      ) : (
        <Dropzone
          onDrop={onFileChange}
          onReject={(files) => console.log('rejected files', files)}
          maxSize={3 * 1024 ** 2}
          accept={{ 'image/*': [] }}
          className='mt-7 flex h-[180px] max-w-xs flex-col items-center justify-center border-[1px] text-center md:h-[216px] md:max-w-sm'
        >
          <div>
            <IconPhoto size={40} stroke={1} color='#999999' />
            <div className='text-dark-300'>タップで写真を選択</div>
          </div>
        </Dropzone>
      )}
    </div>
  )
}
