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
  tLID: string
  title: string
}

type UnionActionType =
  removeTaskActionType
  | addTaskActionType
  | changeTaskStatusActionType
  | changeTaskTitleActionType
  | addTodolistActionType
  | removeTodolistActionType

const initialState: TasksStateType = {
  count:[]
}

export const tasksReducer = (state: TasksStateType = initialState, action: UnionActionType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      const copyState = {...state}
      let tasksTodolist = copyState[action.tLID]
      copyState[action.tLID] = tasksTodolist.filter(t => t.id !== action.taskID)
      return copyState
    }
    case 'ADD-TASK': {
      const copyState = {...state}
      let newTask = {id: v1(), title: action.title, isDone: false}
      let tasksTodolist = copyState[action.tLID]
      copyState[action.tLID] = [newTask, ...tasksTodolist]
      return copyState
    }
    case 'CHANGE-TASK-STATUS': {
      const copyState = {...state}
      let tasksTodolist = copyState[action.tLID]
      copyState[action.tLID] = tasksTodolist.map(t =>
        t.id === action.taskID
          ? {...t, isDone: action.isDone}
          : t)
      return copyState
    }
    case 'CHANGE-TASK-TITLE': {
      const copyState = {...state}
      let tasksTodolist: TasksType[] = copyState[action.tLID]
      copyState[action.tLID] = tasksTodolist.map(t =>
        t.id === action.taskID
          ? {...t, title: action.title}
          : t)
      return copyState
    }
    case 'ADD-TODOLIST': {
      return {
        ...state,
        [action.id]: [],
      }
    }
    case 'REMOVE-TODOLIST': {
      const copyState = {...state}
      delete copyState[action.id]
      return copyState
    }
    default:
      return state
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
export const changeTaskTitleAC = (taskID: string, tLID: string, title: string): changeTaskTitleActionType => {
  return {type: 'CHANGE-TASK-TITLE', taskID, tLID, title}
}
