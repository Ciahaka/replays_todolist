import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {ChangeFilterType} from './App';

export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistPropsType = {
  id: string
  title: string
  tasks: TasksType[]
  removeTasks: (taskID: string, tLID: string) => void
  removeTodo:(tLID: string)=>void
  changeFilter: (tdID: string, value: ChangeFilterType) => void
  addTask: (title: string, tLID: string) => void
  statusCheckbox: (taskID: string, tLID: string, isDone: boolean) => void
  filter: ChangeFilterType
}
export const Todolist = (props: TodolistPropsType) => {

  const [value, setValue] = useState('')
  const [error, setError] = useState<null | string>(null)

  const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
  const addTaskHandler = () => {
    if (value.trim() !== '') {
      props.addTask(value.trim(), props.id)
      setValue('')
    } else setError('Заполните поле!')
  }
  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
    if (e.key === 'Enter') {
      addTaskHandler()
    }
  }
  const removeTodoHandler = () => {
    props.removeTodo(props.id)
  }
  const allStatusFilterHandler = () => props.changeFilter(props.id, 'All')
  const activeStatusFilterHandler = () => props.changeFilter(props.id, 'Active')
  const completedStatusFilterHandler = () => props.changeFilter(props.id, 'Completed')

  return (
    <div>
      <div>
        <h3>{props.title}
          <button onClick={()=>removeTodoHandler()}>✖️</button>
        </h3>

      </div>

      <div>
        <input value={value}
               onChange={changeValueInputHandler}
               onKeyDown={keyDownHandler}
               className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+
        </button>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t: TasksType) => {

          const removeTaskHandler = () => props.removeTasks(t.id, props.id)
          const taskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let bindCheckbox = e.currentTarget.checked
            props.statusCheckbox(t.id, props.id, bindCheckbox)
          }
          return <li key={t.id}
                     className={t.isDone ? 'completed-task' : ''}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={taskStatusHandler}
            />
            <span>{t.title}</span>
            <button onClick={() => {
              removeTaskHandler()
            }}>✖️
            </button>
          </li>
        })}

      </ul>
      <div>
        <button className={props.filter === 'All' ? 'active-filter' : ''}
                onClick={() => {
                  allStatusFilterHandler()
                }}>All
        </button>
        <button className={props.filter === 'Active' ? 'active-filter' : ''}
                onClick={() => {
                  activeStatusFilterHandler()
                }}>Active
        </button>
        <button className={props.filter === 'Completed' ? 'active-filter' : ''}
                onClick={() => {
                  completedStatusFilterHandler()
                }}>Completed
        </button>
      </div>
    </div>
  )
}

