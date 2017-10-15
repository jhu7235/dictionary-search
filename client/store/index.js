import { createStore, combineReducers, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import dictionary from './actions/dictionary';

const reducer =  combineReducers({dictionary});
const middleware = applyMiddleware(thunkMiddleware);

export default createStore(reducer, middleware);
