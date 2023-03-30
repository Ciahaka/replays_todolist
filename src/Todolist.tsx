import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {ChangeFilterType} from './App';


export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistPropsType = {
  title: string
  tasks: TasksType[]
  removeTasks: (id: string) => void
  changeFilter: (value: ChangeFilterType) => void
  addTask: (title: string) => void
}
export const Todolist = (props: TodolistPropsType) => {
  const [value, setValue] = useState('')
  const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
  const addTaskHandler = () => {
    props.addTask(value)
    setValue('')
  }
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      props.addTask(value)
      setValue('')
    }
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={value}
               onChange={changeValueInputHandler}
               onKeyDown={keyDownHandler}
        />
        <button onClick={addTaskHandler}>+
        </button>
      </div>
      <ul>
        {props.tasks.map((t: TasksType) => {

          return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => {
              props.removeTasks(t.id)
            }}>✖️
            </button>
          </li>

        })}

      </ul>
      <div>
        <button onClick={() => {
          props.changeFilter('All')
        }}>All
        </button>
        <button onClick={() => {
          props.changeFilter('Active')
        }}>Active
        </button>
        <button onClick={() => {
          props.changeFilter('Completed')
        }}>Completed
        </button>
      </div>
    </div>
  )
}

