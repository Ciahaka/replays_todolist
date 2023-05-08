import type {Meta, StoryObj} from '@storybook/react';
import React, {ChangeEvent, useState} from 'react';
import {EditeTitleType, EditTitleForm} from './EditTitleForm';

const meta = {
  title: 'Todolist/EditTitleForm',
  component: EditTitleForm,
  tags: ['autodocs'],
  argTypes: {
    changeTitle: {
      description: 'Change Title',
      action: 'Изменена форма элемента на ввод данных'
    },
  },
} satisfies Meta<typeof EditTitleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStateEditTitleForm: Story = {
  args: {
    title: 'Test Value'
  }
};
export const EditStateTitleForm = (args: EditeTitleType) => {


  let [title, setTitle] = useState('')
  let [editMode, setEditMode] = useState(true)

  const activateViewMode = () => {
    setEditMode(true)
    setTitle(args.title)
  }
  const returnViewElement = () => {
    setEditMode(false)
    args.changeTitle(title)
  }
  const changeTitleElement = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <input onChange={changeTitleElement} value={title} autoFocus onBlur={returnViewElement}/>
    : <span onDoubleClick={activateViewMode}>{args.title}</span>
}
