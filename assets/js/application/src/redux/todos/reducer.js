import { createReducer } from 'redux-starter-kit';

import * as actions from './actions';

const initState = {
  data: [],
  request: false,
  error: {},
  meta: {}
};

const reducer = createReducer(initState, {
  [actions.request.toString()]: () => ({ request: true }),

  [actions.success.toString()]: (state, action) => ({
    ...initState,
    data: action.payload.data,
    meta: { ...state.meta, ...action.payload.meta },
  }),

  [actions.failure.toString()]: (state, action) => ({
    initState,
    error: { ...state.error, ...action.payload }
  })
});

export default reducer;
