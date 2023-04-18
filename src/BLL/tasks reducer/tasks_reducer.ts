import {TasksStateType} from '../../component/App';
import {v1} from 'uuid';
import {TasksType} from '../../component/Todolist';
import {addTodolistActionType, removeTodolistActionType} from '../todolist reducer/todolist_reducer';


export type removeTaskActionType = {
  type: 'REMOVE-TASK'
  taskID: string
  tLID: string
}
export type addTaskActionType = {
  type: 'ADD-TASK'
  title: string
  tLID: string
}
export type changeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  isDone: boolean
  taskID: string
  tLID: string
}
export type changeTaskTitleActionType = {
  type: 'CHANGE-TASK-TITLE'
  taskID: string
  title: string
  tLID: string
}

type UnionActionType =
  removeTaskActionType
  | addTaskActionType
  | changeTaskStatusActionType
  | changeTaskTitleActionType
  | addTodolistActionType
  | removeTodolistActionType

export const tasksReducer = (state: TasksStateType, action: UnionActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      let tasksTodolist = state[action.tLID]
      state[action.tLID] = tasksTodolist.filter(t => t.id !== action.taskID)
      return {...state}
    }
    case 'ADD-TASK': {
      let newTask = {id: v1(), title: action.title, isDone: false}
      let tasksTodolist = state[action.tLID]
      state[action.tLID] = [newTask, ...tasksTodolist]
      return {...state}
    }
    case 'CHANGE-TASK-STATUS': {
      let tasksTodolist = state[action.tLID]
      let newStatusTask = tasksTodolist.find(t => t.id === action.taskID)
      if (newStatusTask) {
        newStatusTask.isDone = action.isDone
      }
      return {...state}
    }
    case 'CHANGE-TASK-TITLE': {
      let tasksTodolist: TasksType[] = state[action.tLID]
      let newStatusTask = tasksTodolist.find(t => t.id === action.taskID)
      if (newStatusTask) {
        newStatusTask.title = action.title
      }
      return {...state}
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.id]: []
    }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state}
      delete copyState[action.id]

      return copyState
    }
    default:
      throw new Error('Error! Action crash me! Error!')
  }
}
export const removeTaskAC = (taskID: string, tLID: string): removeTaskActionType => {
  return {type: 'REMOVE-TASK', taskID, tLID}
}
export const addTaskAC = (title: string, tLID: string): addTaskActionType => {
  return {type: 'ADD-TASK', title, tLID}
}
export const changeTaskStatusAC = (taskID: string, isDone: boolean, tLID: string): changeTaskStatusActionType => {
  return {type: 'CHANGE-TASK-STATUS', taskID, isDone, tLID}
}
export const changeTaskTitleAC = (taskID: string, title: string, tLID: string): changeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskID, title, tLID}
}
