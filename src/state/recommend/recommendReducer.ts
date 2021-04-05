import {
  FETCH_RECOMMEND_START,
  FETCH_RECOMMEND_START_SUCCESS,
  FETCH_RECOMMEND_START_FAIL,
  RecommendAction,
} from './recommendActions';

interface RecommondState {
  productList: any[];
  loading: boolean;
  error: string | null;
}

const defaultState: RecommondState = {
  loading: true,
  error: null,
  productList: [],
};

export default (state = defaultState, action: RecommendAction) => {
  switch (action.type) {
    case FETCH_RECOMMEND_START:
      return { ...state, loading: true };
    case FETCH_RECOMMEND_START_SUCCESS:
      return { ...state, loading: false, productList: action.payload };
    case FETCH_RECOMMEND_START_FAIL:
      return { ...state, loading: false, null: action.payload };
    default:
      return state;
  }
};
