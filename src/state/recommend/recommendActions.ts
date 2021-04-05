import { ThunkAction } from 'redux-thunk';
import { RoutState } from '../store';
import axios from 'axios';
export const FETCH_RECOMMEND_START = 'FETCH_RECOMMEND_START'; // 推荐信息api
export const FETCH_RECOMMEND_START_SUCCESS = 'FETCH_RECOMMEND_START_SUCCESS'; // api调用成功
export const FETCH_RECOMMEND_START_FAIL = 'FETCH_RECOMMEND_START_FAIL'; // api调用失败

interface FeachRecommendAction {
  type: typeof FETCH_RECOMMEND_START;
}

interface FeachRecommendSuccessAction {
  type: typeof FETCH_RECOMMEND_START_SUCCESS;
  payload: any;
}

interface FeachRecommendFailAction {
  type: typeof FETCH_RECOMMEND_START_FAIL;
  payload: any;
}

export type RecommendAction =
  | FeachRecommendAction
  | FeachRecommendSuccessAction
  | FeachRecommendFailAction;

export const feachRecommendActionCreator = (): FeachRecommendAction => {
  return {
    type: FETCH_RECOMMEND_START,
  };
};

export const feachRecommendSuccessActionCreator = (
  data
): FeachRecommendSuccessAction => {
  return {
    type: FETCH_RECOMMEND_START_SUCCESS,
    payload: data,
  };
};

export const feachRecommendFailActionCreator = (
  error
): FeachRecommendFailAction => {
  return {
    type: FETCH_RECOMMEND_START_FAIL,
    payload: error,
  };
};

export const getDataListActionCreator = (): ThunkAction<
  void,
  RoutState,
  unknown,
  RecommendAction
> => async (dispatch, getState) => {
  dispatch(feachRecommendActionCreator());
  try {
    const { data } = await axios.get(
      'http://123.56.149.216:8080/api/productCollections'
    );
    dispatch(feachRecommendSuccessActionCreator(data));
  } catch (error) {
    dispatch(feachRecommendFailActionCreator(error.message));
  }
};
