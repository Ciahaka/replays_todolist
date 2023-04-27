import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Input, Space} from 'antd';
import {
  FileProtectOutlined,
  PlusCircleTwoTone,
} from '@ant-design/icons';

export type UniversalInputType = {
  addInputForm: (title: string) => void
}

export const UniversalInput = React.memo((props: UniversalInputType) => {
  console.log('!!UniversalInput!!')
  let [value, setValue] = useState('')
  let [error, setError] = useState<null | string>(null)

  const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
  const addTaskHandler = () => {
    if (value.trim() !== '') {
      props.addInputForm(value.trim())
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
});

