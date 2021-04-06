import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './i18n/configs';
import { Provider } from 'react-redux'
import rootstore from './state/store'
import axios from 'axios'
import { PersistGate } from 'redux-persist/integration/react'

axios.defaults.headers['x-icode'] = '670FB077212675DE'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={rootstore.store}>
      <PersistGate persistor={rootstore.persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
