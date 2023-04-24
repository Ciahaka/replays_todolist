import {ChangeFilterType, TodolistType} from '../../component/App';
import {v1} from 'uuid';

export type removeTodolistActionType = {
  type: 'REMOVE-TODOLIST'
  id: string
}
export type addTodolistActionType = {
  type: 'ADD-TODOLIST'
  title: string
  id: string
}
export type changeTodolistTitleActionType = {
  type: 'CHANGE-TODOLIST-TITLE'
  id: string
  title: string
}
export type changeTodolistFilterActionType = {
  type: 'CHANGE-TODOLIST-FILTER'
  id: string
  filter: ChangeFilterType
}
type ActionType =
  removeTodolistActionType
  | addTodolistActionType
  | changeTodolistTitleActionType
  | changeTodolistFilterActionType

export let tLID_1 = v1()
export let tLID_2 = v1()

const initialState: Array<TodolistType> = [
  {id: tLID_1, title: 'Что учить?', filter: 'All'},
  {id: tLID_2, title: 'Что купить?', filter: 'All'},
]

export const todolistReducer = (state: Array<TodolistType> = initialState, action: ActionType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(td => td.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [{id: action.id, title: action.title, filter: 'All'}, ...state,
      ]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      let changeArr = state.find(tl => tl.id === action.id)
      if (changeArr) {
        changeArr.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      // debugger
      state.find((td) => td.id === action.id ? td.filter = action.filter : '')
      return [...state]
    }
    default:
      return  state
  }
}
export const removeTodolistAC = (id: string): removeTodolistActionType => {
  return {type: 'REMOVE-TODOLIST', id}
}
export const addTodolistAC = (title: string): addTodolistActionType => {
  return {type: 'ADD-TODOLIST', title, id: v1()}
}
export const changeTodolistTitleAC = (id: string, title: string): changeTodolistTitleActionType => {
  return {type: 'CHANGE-TODOLIST-TITLE', id, title}
}
export const changeTodolistFilterAC = (id: string, filter: ChangeFilterType): changeTodolistFilterActionType => {
  return {type: 'CHANGE-TODOLIST-FILTER', id, filter}
}
