import { createStore, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware'
import logger from 'redux-logger'
import reducers from './reducers';
export default createStore(reducers, applyMiddleware(logger, promise))