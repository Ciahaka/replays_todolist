import React, {ChangeEvent, useState} from 'react';
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
  addTask: (title:string) => void
}
export const Todolist = (props: TodolistPropsType) => {
  const [title, setTitle] = useState('')
const changeValueInputHandler = (e:ChangeEvent<HTMLInputElement>) =>{
  setTitle(e.currentTarget.value)
}
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input value={title}
        onChange={changeValueInputHandler}/>
        <button onClick={() => {
          props.addTask(title)
        }}>+
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

