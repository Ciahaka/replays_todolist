import React from 'react';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {Button, Checkbox, List} from 'antd';
import {Space} from 'antd/lib';
import {CloseOutlined} from '@ant-design/icons';
import {EditTitleForm} from '../universal edit title form/EditTitleForm';
import {TasksType} from './Todolist';

export type TaskPropsType = {
  removeTasks: (taskID: string, tLID: string) => void
  statusCheckbox: (taskID: string, isDone: boolean, tLID: string) => void
  changeTaskTitle: (taskID: string, tLID: string, title: string) => void
  task:TasksType
  tlID:string
}

export const Task = (props:TaskPropsType) => {
  const removeTaskHandler = () => props.removeTasks(props.task.id, props.tlID)
  const taskStatusHandler = (e: CheckboxChangeEvent) => {
    let bindCheckbox = e.target.checked
    props.statusCheckbox(props.task.id, bindCheckbox, props.tlID)
  }
  const changeTaskTitle = (newTitle: string) => {
    props.changeTaskTitle(props.task.id, props.tlID, newTitle)
  }

  return <>
    <List>
      <li key={props.task.id}
          className={props.task.isDone ? 'completed-task' : ''}>
        <Space>
          <Checkbox
            type="checkbox"
            checked={props.task.isDone}
            onChange={taskStatusHandler}
          />
          <Button size="small"
                  style={{color: 'red'}}
                  icon={<CloseOutlined/>}
                  onClick={() => {
                    removeTaskHandler()
                  }}
          >
          </Button>
          <EditTitleForm title={props.task.title} changeTitle={changeTaskTitle}/>
        </Space>
      </li>
    </List>

  </>
};

