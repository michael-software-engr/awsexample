import { createAction } from 'redux-starter-kit';

export const request = createAction('todos/request');

export const success = createAction('todos/success', (todos) => ({
  payload: { data: todos },
  meta: { createdAt: new Date().toISOString() }
}));

export const failure = createAction('todos/failure', (response) => ({
  error: {
    createdAt: new Date().toISOString(),
    response
  }
}));
