import { Reducer } from 'react'
import type { Area } from 'react-easy-crop'

type State = {
  opened: boolean
  imgSrc: string
  crop: { x: number; y: number }
  zoom: number
  minZoom: number
  croppedAreaPixels: Area | null
}

export type Action = {
  type: keyof State
  payload: {
    [K in keyof State]?: State[K]
  }
}

/**
 * @package
 */
export const cropInitialState: { [K in keyof State]: State[K] } = {
  opened: false,
  imgSrc: '',
  crop: { x: 0, y: 0 },
  zoom: 1,
  minZoom: 1,
  croppedAreaPixels: null,
}

/**
 * @package
 */
export const cropReducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'opened': {
      return {
        ...state,
        opened: action.payload.opened ?? cropInitialState['opened'],
      }
    }
    case 'imgSrc': {
      return {
        ...state,
        opened: action.payload.opened ?? cropInitialState['opened'],
        imgSrc: action.payload.imgSrc ?? cropInitialState['imgSrc'],
      }
    }
    case 'crop': {
      return {
        ...state,
        crop: action.payload.crop ?? cropInitialState['crop'],
      }
    }
    case 'zoom': {
      return {
        ...state,
        zoom: action.payload.zoom ?? cropInitialState['zoom'],
      }
    }
    case 'minZoom': {
      return {
        ...state,
        zoom: action.payload.zoom ?? cropInitialState['zoom'],
        minZoom: action.payload.zoom ?? cropInitialState['zoom'],
      }
    }
    case 'croppedAreaPixels': {
      return {
        ...state,
        croppedAreaPixels:
          action.payload.croppedAreaPixels ??
          cropInitialState['croppedAreaPixels'],
      }
    }
  }
}
