import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

const openNotificationWithIcon = (type, error) => {
  notification[type]({
    message: error,
    description: '登陆失败',
  });
};

interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

// 使用createAsyncThunk 处理
export const searchProduct = createAsyncThunk(
  'productSearch/searchProduct',
  async (
    paramaters: {
      keywords: string;
      pageNumber: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    try {
      let url = `http://123.56.149.216:8080/api/touristRoutes?pageNumber=${paramaters.pageNumber}&pageSize=${paramaters.pageSize}`;
      if (paramaters.keywords) {
        url += `&keyword=${paramaters.keywords}`;
      }
      const res = await axios.get(url);
      return {
        data: res.data,
        pagination: JSON.parse(res.headers['x-pagination']),
      };
    } catch (error) {
      openNotificationWithIcon('error', error);
    }
  }
);

export const productSearchSlice = createSlice({
  name: 'productSearch',
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      state.loading = true;
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.loading = false;
      state.error = null;
    },
    [searchProduct.rejected.type]: (
      state,
      action: PayloadAction<string | null>
    ) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
