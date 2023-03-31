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
  removeTasks: (taskID: string) => void
  changeFilter: (value: ChangeFilterType) => void
  addTask: (title: string) => void
  statusCheckbox: (taskID: string, isDone: boolean) => void
  filter: ChangeFilterType
}
export const Todolist = (props: TodolistPropsType) => {

  const [value, setValue] = useState('')
  const [error, setError] = useState<null | string>(null)


  const changeValueInputHandler = (e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)
  const addTaskHandler = () => {
    if (value.trim() !== '') {
      props.addTask(value.trim())
      setValue('')
    } else setError('Заполните поле!')
  }

  const keyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null)
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
               className={error ? 'error' : ''}
        />
        <button onClick={addTaskHandler}>+
        </button>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      <ul>
        {props.tasks.map((t: TasksType) => {
          const removeTaskHandler = () => props.removeTasks(t.id)
          const taskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let bindCheckbox = e.currentTarget.checked
            props.statusCheckbox(t.id, bindCheckbox)
          }
          return <li key={t.id}><input
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

