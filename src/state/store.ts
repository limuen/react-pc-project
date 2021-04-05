import { createStore, combineReducers } from 'redux';
import languageReducer from './language/languageReducer';
import recommendReducer from './recommend/recommendReducer';

const rootReducer = combineReducers({
  languageReducer,
  recommendReducer,
});

const store = createStore(rootReducer);

export type RoutState = ReturnType<typeof store.getState>;

export default store;
