/* eslint-disable indent */
import { createWrapper } from 'next-redux-wrapper';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import reducer from '../reducers';
import rootSaga from '../sagas';

const alertError = (errorMessage) => {
  if (typeof window === 'undefined') return;
  if (!!errorMessage === false) return;
  alert(errorMessage);
};

const loggerMiddleware = () => (next) => (action) => {
  const isProduction = process.env.NODE_ENV === 'production';
  const isHydrate = action.type === '__NEXT_REDUX_WRAPPER_HYDRATE__';
  const isError = action.type.includes('FAILURE');

  if (!isProduction && !isHydrate) {
    console.log('action', action);
  }
  if (isError) {
    alertError(action.data);
  }

  return next(action);
};

const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware, loggerMiddleware];
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
  const store = createStore(reducer, enhancer);
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

const wrapper = createWrapper(configureStore, {
  debug: process.env.NODE_ENV === 'development',
});

export default wrapper;
