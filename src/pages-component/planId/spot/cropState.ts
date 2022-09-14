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
  payload: Partial<State>
}

/**
 * @package
 */
export const initialState: State = {
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
export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'opened': {
      return {
        ...state,
        opened: action.payload.opened ?? initialState['opened'],
      }
    }
    case 'imgSrc': {
      return {
        ...state,
        opened: action.payload.opened ?? initialState['opened'],
        imgSrc: action.payload.imgSrc ?? initialState['imgSrc'],
      }
    }
    case 'crop': {
      return {
        ...state,
        crop: action.payload.crop ?? initialState['crop'],
      }
    }
    case 'zoom': {
      return {
        ...state,
        zoom: action.payload.zoom ?? initialState['zoom'],
      }
    }
    case 'minZoom': {
      return {
        ...state,
        zoom: action.payload.zoom ?? initialState['zoom'],
        minZoom: action.payload.zoom ?? initialState['zoom'],
      }
    }
    case 'croppedAreaPixels': {
      return {
        ...state,
        croppedAreaPixels:
          action.payload.croppedAreaPixels ?? initialState['croppedAreaPixels'],
      }
    }
  }
}
