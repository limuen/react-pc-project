import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { notification } from 'antd';

const openNotificationWithIcon = (type, error) => {
  notification[type]({
    message: error,
    description: '登陆失败',
  });
};

interface UserState {
  loading: boolean;
  error: string | null;
  token: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  token: null,
};

export const login = createAsyncThunk(
  'user/login',
  async (
    paramaters: {
      email: string;
      password: string;
    },
    thunkAPI
  ) => {
    try {
      const { data } = await axios.post(
        'http://123.56.149.216:8080/auth/login',
        {
          email: paramaters.email,
          password: paramaters.password,
        }
      );
      return data.token;
    } catch (error) {
      openNotificationWithIcon('error', error.message);
    }
  }
);

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [login.pending.type]: (state) => {
      state.loading = true;
    },
    [login.fulfilled.type]: (state, action) => {
      state.token = action.payload;
      state.loading = false;
      state.error = null;
    },
    [login.rejected.type]: (state, action: PayloadAction<string | null>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
