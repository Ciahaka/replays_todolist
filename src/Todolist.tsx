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
      addTaskHandler()
    }
  }
  const allStatusFilterHandler = () => props.changeFilter('All')
  const activeStatusFilterHandler = () => props.changeFilter('Active')
  const completedStatusFilterHandler = () => props.changeFilter('Completed')


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
          const removeTaskHandler = () => props.removeTasks(t.id)

          return <li key={t.id}><input type="checkbox" checked={t.isDone}/>
            <span>{t.title}</span>
            <button onClick={() => {
              removeTaskHandler()
            }}>✖️
            </button>
          </li>
        })}

      </ul>
      <div>
        <button onClick={() => {
          allStatusFilterHandler()
        }}>All
        </button>
        <button onClick={() => {
          activeStatusFilterHandler()
        }}>Active
        </button>
        <button onClick={() => {
          completedStatusFilterHandler()
        }}>Completed
        </button>
      </div>
    </div>
  )
}

