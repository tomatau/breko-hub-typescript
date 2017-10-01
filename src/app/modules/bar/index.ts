import { PENDING, REJECTED, FULFILLED } from 'redux-promise-middleware'
import { typeToReducer, get } from 'app/utils'
import { request } from 'app/utils'

export const API_FETCH = 'bar/API_FETCH'

export const apiFetch = () => ({
  type: API_FETCH,
  payload: {
    promise: request.fetch('/api/bar'),
  },
})

const getBar = get('payload.bar')

const initialState = {
  isPending: false,
  error: false,
  data: [],
}

export const reducers = typeToReducer({
  [API_FETCH]: {
    [PENDING]: () => ({
      ...initialState,
      isPending: true,
    }),
    [REJECTED]: (state, action) => ({
      ...initialState,
      error: action.payload,
    }),
    [FULFILLED]: (state, action) => ({
      ...initialState,
      data: getBar(action),
    }),
  },
}, initialState)
