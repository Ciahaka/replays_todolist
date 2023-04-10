import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, Space} from 'antd';

export type UniversalInputType = {
  addInputForm: (title: string) => void
}

export const UniversalInput = (props: UniversalInputType) => {
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
    setError(null)
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }

  return (
    <div>
      <Space>
        <input value={value}
               onChange={changeValueInputHandler}
               onKeyDown={keyDownHandler}
               className={error ? 'error' : ''}
        />
        <Button onClick={addTaskHandler}>+</Button>
      </Space>
      {error && <div className={'error-message'}>{error}</div>}
    </div>
  );
};

