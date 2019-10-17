import { createSlice } from 'redux-starter-kit';
import { camelizeKeys } from 'humps';

const initialState = {
  data: [],
  request: false,
  error: {},
  meta: {}
};

const slice = createSlice({
  slice: 'todos',

  initialState,

  reducers: {
    request() {
      return { request: true };
    },

    success(state, action) {
      return {
        ...initialState,
        data: camelizeKeys(action.payload.data).map((todo) => ({
          ...todo,
          done: false,
          canceled: false
        })),
        meta: {
          ...state.meta,
          createdAt: new Date().toISOString(),
          ...action.payload.meta
        },
      };
    },

    failure(state, action) {
      return {
        initialState,
        error: {
          ...state.error,
          createdAt: new Date().toISOString(),
          ...action.payload
        }
      };
    },

    toggleDone(state, action) {
      const { id } = action.payload;
      const verifyFoundTodo = state.data.find((todo) => todo.id === id);
      if (!verifyFoundTodo) throw Error(`... unable to find todo with id "${id}"`);

      const data = state.data.map((todo) => ({
        ...todo,
        done: todo.id === id ? !todo.done : todo.done,
        canceled: todo.id === id ? false : todo.canceled
      }));

      return { ...state, data };
    },

    toggleCancel(state, action) {
      const { id } = action.payload;
      const verifyFoundTodo = state.data.find((todo) => todo.id === id);
      if (!verifyFoundTodo) throw Error(`... unable to find todo with id "${id}"`);

      const data = state.data.map((todo) => ({
        ...todo,
        canceled: todo.id === id ? !todo.canceled : todo.canceled,
        done: todo.id === id ? false : todo.done
      }));

      return { ...state, data };
    },

    resetStatus(state, action) {
      const { id } = action.payload;
      const verifyFoundTodo = state.data.find((todo) => todo.id === id);
      if (!verifyFoundTodo) throw Error(`... unable to find todo with id "${id}"`);

      const data = state.data.map((todo) => ({
        ...todo,
        done: todo.id === id ? false : todo.done,
        canceled: todo.id === id ? false : todo.canceled
      }));

      return { ...state, data };
    }
  }
});

const {
  request, success, failure,
  toggleDone, toggleCancel, resetStatus
} = slice.actions;

export const unconnected = {
  request, success, failure,
  toggleDone, toggleCancel, resetStatus
};

export default slice.reducer;
