import { Reducer } from 'react'

type State = {
  memo: string
  marked: 'White' | 'Red' | 'Green'
  loading: boolean
  spotDialog: boolean
  memoDialog: boolean
  targetMemoId: number
  passwordModal: boolean
}

type Action = {
  type:
    | keyof State
    | 'createMemoSuccess'
    | 'createMemoFailed'
    | 'deleteMemoFailed'
    | 'deleteSpotFailed'
  payload: Partial<State>
}

/**
 * @package
 */
export const initialState: State = {
  memo: '',
  marked: 'White',
  loading: false,
  spotDialog: false,
  memoDialog: false,
  targetMemoId: 0,
  passwordModal: false,
}

/**
 * @package
 */
export const reducer: Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'memo': {
      return {
        ...state,
        memo: action.payload.memo ?? initialState['memo'],
      }
    }
    case 'marked': {
      return {
        ...state,
        marked: action.payload.marked ?? initialState['marked'],
      }
    }
    case 'loading': {
      return {
        ...state,
        loading: action.payload.loading ?? initialState['loading'],
      }
    }
    case 'spotDialog': {
      return {
        ...state,
        spotDialog: action.payload.spotDialog ?? initialState['spotDialog'],
      }
    }
    case 'memoDialog': {
      return {
        ...state,
        memoDialog: action.payload.memoDialog ?? initialState['memoDialog'],
      }
    }
    case 'targetMemoId': {
      return {
        ...state,
        targetMemoId:
          action.payload.targetMemoId ?? initialState['targetMemoId'],
      }
    }
    case 'passwordModal': {
      return {
        ...state,
        passwordModal:
          action.payload.passwordModal ?? initialState['passwordModal'],
      }
    }
    case 'createMemoSuccess': {
      return {
        ...state,
        memo: action.payload.memo ?? initialState['memo'],
        marked: action.payload.marked ?? initialState['marked'],
        loading: action.payload.loading ?? initialState['loading'],
      }
    }
    case 'createMemoFailed': {
      return {
        ...state,
        passwordModal:
          action.payload.passwordModal ?? initialState['passwordModal'],
        loading: action.payload.loading ?? initialState['loading'],
      }
    }
    case 'deleteMemoFailed': {
      return {
        ...state,
        memoDialog: action.payload.memoDialog ?? initialState['memoDialog'],
        passwordModal:
          action.payload.passwordModal ?? initialState['passwordModal'],
      }
    }
    case 'deleteSpotFailed': {
      return {
        ...state,
        spotDialog: action.payload.spotDialog ?? initialState['spotDialog'],
        passwordModal:
          action.payload.passwordModal ?? initialState['passwordModal'],
      }
    }
  }
}
