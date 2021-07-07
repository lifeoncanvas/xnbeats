import { combineReducers } from 'redux';
import auth from './auth';
import reviews from './reviews';

const appReducers = combineReducers({
    auth,
    reviews
})

export default appReducers;