import type { DateRangePickerValue } from '@mantine/dates'
import { Reducer } from 'react'

type State = {
  active: ('filled' | 'active' | 'blank')[]
  name: string
  dateRange: DateRangePickerValue
  password1: string
  password2: string
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
  dateRange: [null, null],
  password1: '',
  password2: '',
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
    case 'dateRange': {
      return {
        ...state,
        dateRange: action.payload.dateRange ?? initialState['dateRange'],
      }
    }
    case 'password1': {
      return {
        ...state,
        password1: action.payload.password1 ?? initialState['password1'],
      }
    }
    case 'password2': {
      return {
        ...state,
        password2: action.payload.password2 ?? initialState['password2'],
      }
    }
  }
}
