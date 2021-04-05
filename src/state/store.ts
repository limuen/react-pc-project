import { createStore } from 'redux';
import languageReducer from './language/languageReducer';
const store = createStore(languageReducer);

export type RoutState = ReturnType<typeof store.getState>

export default store;
