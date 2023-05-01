import React, {ChangeEvent, useState} from 'react';

export type EditeTitleType = {
  title: string
  changeTitle: (title: string) => void
}

export const EditTitleForm = React.memo((props: EditeTitleType) => {
  console.log('!!!EditTitleForm!!!')

  let [title, setTitle] = useState('')
  let [editMode, setEditMode] = useState(false)

  const activateViewMode = () => {
    setEditMode(true)
    setTitle(props.title)
  }
  const returnViewElement = () => {
    setEditMode(false)
    props.changeTitle(title)
  }
  const changeTitleElement = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  return editMode
    ? <input onChange={changeTitleElement} value={title} autoFocus onBlur={returnViewElement}/>
    : <span onDoubleClick={activateViewMode}>{props.title}</span>
});

