import React, {useCallback} from 'react';
import {ChangeFilterType} from './App';
import {EditTitleForm} from '../universal edit title form/EditTitleForm';
import {Button} from 'antd';
import {Space} from 'antd/lib';
import {DeleteOutlined,
} from '@ant-design/icons';
import {Task} from './Task';
import {UniversalInput} from '../universal input form/UniversalInput';


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
  statusCheckbox: (taskID: string, isDone: boolean, tLID: string) => void
  changeTaskTitle: (taskID: string, tLID: string, title: string) => void
  changeTodoTitle: (tLID: string, title: string) => void
}

export const Todolist = React.memo((props: TodolistPropsType) => {
  console.log('!!Todolist!!')
  const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])

  const removeTodoHandler = useCallback(() => props.removeTodo(props.id), [props.removeTodo, props.id])
  const allStatusFilterHandler = useCallback(() => props.changeFilter(props.id, 'All'), [props.changeFilter, props.id])
  const activeStatusFilterHandler = useCallback(() => props.changeFilter(props.id, 'Active'), [props.changeFilter, props.id])
  const completedStatusFilterHandler = useCallback(() => props.changeFilter(props.id, 'Completed'), [props.changeFilter, props.id])
  const changeTitleTodoHandler = useCallback((newTitle: string) => props.changeTodoTitle(props.id, newTitle), [props.changeTodoTitle, props.id])

  return (
    <>
      <div>
        <h3>
          <Space>
            <EditTitleForm title={props.title}
                           changeTitle={changeTitleTodoHandler}/>
            <Button onClick={removeTodoHandler} icon={<DeleteOutlined/>} size="small" style={{color: 'red'}}></Button>
          </Space>
        </h3>
      </div>
      <UniversalInput addInputForm={addTask}/>
      <ul>
        {
          props.tasks.map(t => <Task
            key={t.id}
            tlID={props.id}
            task={t}
            removeTasks={props.removeTasks}
            changeTaskTitle={props.changeTaskTitle}
            statusCheckbox={props.statusCheckbox}
          />)
        }

      </ul>
      <div>
        <Space>
          <Button className={props.filter === 'All' ? 'active-filter' : ''}
                  onClick={() => {
                    allStatusFilterHandler()
                  }}>All
          </Button>
          <Button className={props.filter === 'Active' ? 'active-filter' : ''}
                  onClick={() => {
                    activeStatusFilterHandler()
                  }}>Active
          </Button>
          <Button className={props.filter === 'Completed' ? 'active-filter' : ''}
                  onClick={() => {
                    completedStatusFilterHandler()
                  }}>Completed
          </Button>
        </Space>
      </div>
    </>
  )
})