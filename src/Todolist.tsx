import React from 'react';
import {ChangeFilterType} from './App';


export type TasksType = {
  id: number
  title: string
  isDone: boolean
}
export type TodolistPropsType = {
  title: string
  tasks: TasksType[]
  removeTasks: (id: number) => void
  changeFilter: (value: ChangeFilterType) => void
}
export const Todolist = (props: TodolistPropsType) => {

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input/>
        <button>+</button>
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

