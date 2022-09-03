import { Reducer } from 'react'

/**
 * @package
 */
export type Icon = 'spot' | 'restaurant' | 'souvenir' | 'hotel' | null

type State = {
  active: ('filled' | 'active' | 'blank')[]
  name: string
  icon: Icon
  image: string
  url: string
}

type Action = {
  type: keyof State
  payload: {
    [K in keyof State]?: State[K]
  }
}

/**
 * @package
 */
export const initialState: { [K in keyof State]: State[K] } = {
  active: ['active', 'blank', 'blank'],
  name: '',
  icon: null,
  image: '',
  url: '',
}

/**
 * @package
 */
export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'active': {
      return {
        ...state,
        active: action.payload.active ?? initialState['active'],
      }
    }
    case 'name': {
      return {
        ...state,
        name: action.payload.name ?? initialState['name'],
      }
    }
    case 'icon': {
      return {
        ...state,
        icon: action.payload.icon ?? initialState['icon'],
      }
    }
    case 'image': {
      return {
        ...state,
        image: action.payload.image ?? initialState['image'],
      }
    }
    case 'url': {
      return {
        ...state,
        url: action.payload.url ?? initialState['url'],
      }
    }
  }
}
