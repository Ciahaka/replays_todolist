import type {Meta, StoryObj} from '@storybook/react';
import {UniversalInput, UniversalInputType} from './UniversalInput';
import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Input, Space} from 'antd';
import {FileProtectOutlined, PlusCircleTwoTone} from '@ant-design/icons';

const meta = {
  title: 'Todolist/UniversalInputType',
  component: UniversalInput,
  tags: ['autodocs'],
  argTypes: {
    addInputForm:{
      description:'Changing the state of a component when you click the button',
      action:'The state of the component wants to change to'
    }
  }
} satisfies Meta<typeof UniversalInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UniversalInputStory: Story = {};
export const UniversalInputStoryError=(args:UniversalInputType)=> {
  let [value, setValue] = useState('')
  let [error, setError] = useState<null | string>('Заполните поле!')

  const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
  const addTaskHandler = () => {
    if (value.trim() !== '') {
      args.addInputForm(value.trim())
      setValue('')
    } else setError('Заполните поле!')
  }
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }

  return (
    <div>
      <Space>
        <Input prefix={<FileProtectOutlined style={{opacity: '50%'}}/>}
               placeholder={'add task'}
               value={value}
               onChange={changeValueInputHandler}
               onKeyDown={keyDownHandler}
               className={error ? 'error' : ''}
        />
        <Button onClick={addTaskHandler} size={'small'} icon={<PlusCircleTwoTone twoToneColor="#00a6ff"/>}></Button>
      </Space>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};