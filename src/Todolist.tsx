import React from 'react';

export type TasksType = {
  id: number
  title: string
  isDone: boolean
}
export type TodolistPropsType = {
  title: string
  tasks: TasksType[]
  removeTasks:(id:number)=>void
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
            <button onClick={()=>{props.removeTasks(t.id)}}>✖️</button>
          </li>

        })}

      </ul>
      <div>
        <button>All</button>
        <button>Active</button>
        <button>Completed</button>
      </div>
    </div>
  )
}

