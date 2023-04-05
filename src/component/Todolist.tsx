import React, {ChangeEvent} from 'react';
import {ChangeFilterType} from './App';
import UniversalInput from '../universal input form/UniversalInput';
import {EditTitleForm} from '../universal edit title form/EditTitleForm';


export type TasksType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistPropsType = {
  id: string
  title: string
  filter: ChangeFilterType
  tasks: TasksType[]
  removeTasks: (taskID: string, tLID: string) => void
  removeTodo: (tLID: string) => void
  changeFilter: (tdID: string, value: ChangeFilterType) => void
  addTask: (title: string, tLID: string) => void
  statusCheckbox: (taskID: string, tLID: string, isDone: boolean) => void
  changeTaskTitle: (taskID: string, tLID: string, title: string) => void

}
export const Todolist = (props: TodolistPropsType) => {

  const removeTodoHandler = () => {
    props.removeTodo(props.id)
  }
  const allStatusFilterHandler = () => props.changeFilter(props.id, 'All')
  const activeStatusFilterHandler = () => props.changeFilter(props.id, 'Active')
  const completedStatusFilterHandler = () => props.changeFilter(props.id, 'Completed')

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  return (
    <div>
      <div>
        <h3>{props.title}
          <button onClick={() => removeTodoHandler()}>✖️</button>
        </h3>
      </div>
      <UniversalInput addInputForm={addTask}/>
      <ul>
        {props.tasks.map((t: TasksType) => {

          const removeTaskHandler = () => props.removeTasks(t.id, props.id)
          const taskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let bindCheckbox = e.currentTarget.checked
            props.statusCheckbox(t.id, props.id, bindCheckbox)
          }
          const changeTaskTitle = (newTitle: string) => {
            props.changeTaskTitle(t.id,props.id,newTitle)
          }

          return <li key={t.id}
                     className={t.isDone ? 'completed-task' : ''}>
            <input
              type="checkbox"
              checked={t.isDone}
              onChange={taskStatusHandler}
            />
            <button onClick={() => {
              removeTaskHandler()
            }}>✖️
            </button>
            <EditTitleForm title={t.title} changeTitle={changeTaskTitle}/>
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

