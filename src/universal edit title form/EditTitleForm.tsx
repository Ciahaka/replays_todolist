import React, {useState} from 'react';

export type EditeTitleType = {
  title: string
}

export const EditTitleForm = (props: EditeTitleType) => {
  let [editMode, setEditMode] = useState(false)
  const editeModeHandler = () => {
    setEditMode(true)
  }
  const exitEditModeHandler = () => {
    setEditMode(false)
  }

  return editMode
    ? <input value={props.title} autoFocus onBlur={exitEditModeHandler}/>
    : <span onDoubleClick={editeModeHandler}>{props.title}</span>
};

