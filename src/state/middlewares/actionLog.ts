import { Middleware } from 'redux';
export const actionLog: Middleware = (store) => (next) => (action) => {
  console.log('state当前', store.getState());
  console.log('fire action', action);
  next(action);
  console.log('更新以后的store数据', store.getState());
};
