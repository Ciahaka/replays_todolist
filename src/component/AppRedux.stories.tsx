import AppRedux from './AppRedux';
import {Meta} from '@storybook/react';
import React from 'react';
import {DecoratorAppRedux} from './DecoratorAppRedux';

const meta = {
  title: 'Todolist/AppRedux',
  component: AppRedux,
  tags: ['autodocs'],
  decorators:[DecoratorAppRedux]
} satisfies Meta<typeof AppRedux>;
export default meta;

export const AppReduxStory = () => {
  return <AppRedux/>

};



