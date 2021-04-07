import { createStore, applyMiddleware } from 'redux';
import languageReducer from './language/languageReducer';
import recommendReducer from './recommend/recommendReducer';
import { actionLog } from './middlewares/actionLog';
import thunk from 'redux-thunk';
import { productDetailSlice } from './productDetail/slice';
import { productSearchSlice } from './productSearch/slice';
import { shoppingCartSlice } from './shoppingCart/slice';
import { UserSlice } from './user/slice';
import { OrderSlice } from './order/slice';
// rtk异步
import { combineReducers, configureStore } from '@reduxjs/toolkit';
// 本地存储持久化
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user', 'shoppingCart'],
};

const rootReducer = combineReducers({
  language: languageReducer,
  recommend: recommendReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: UserSlice.reducer,
  shoppingCart: shoppingCartSlice.reducer,
  order: OrderSlice.reducer,
});

// 持久化本地存储
const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = createStore(rootReducer, applyMiddleware(thunk, actionLog));
const store = configureStore({
  // 持久化
  reducer: persistedReducer,
  // reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    // redux-persist的数据保存方式以键值对的方式保存在local storage中，而真正储存的数据是stringfy以后的字符串，
    // 当需要使用的时候再把string从local storage中取出来，然后再转化为对象。既然保存的数据是string，所以添加serializableCheck 为 false
    ...getDefaultMiddleware({
      serializableCheck: false,
    }),
    actionLog,
  ],
  devTools: true,
});
// 持久化store
const persistor = persistStore(store);

export type RoutState = ReturnType<typeof persistedReducer>;

export default { store, persistor };
