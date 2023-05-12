import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRedux from './component/AppRedux';
import {Provider} from 'react-redux';
import {store} from './BLL/store/store';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/*<App/>*/}
    {/*<AppReducer/>*/}
    <Provider store={store}>
      <AppRedux/>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals


