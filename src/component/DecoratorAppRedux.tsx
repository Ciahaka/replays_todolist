import React from 'react';
import {Provider} from 'react-redux';
import {store} from '../BLL/store/store';

export const DecoratorAppRedux = (story: any) => {
  return <Provider store={store}>
    {story()}
  </Provider>
}