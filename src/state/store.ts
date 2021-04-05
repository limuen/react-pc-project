import { createStore, combineReducers, applyMiddleware } from 'redux';
import languageReducer from './language/languageReducer';
import recommendReducer from './recommend/recommendReducer';
import { actionLog } from './middlewares/actionLog';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({
  languageReducer,
  recommendReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));

export type RoutState = ReturnType<typeof store.getState>;

export default store;
