import {TodolistType} from '../../component/App';
import {v1} from 'uuid';

type ActionType = {
  type: string
  [key: string]: any
}
export const todolistReducer = (state: Array<TodolistType>, action: ActionType): Array<TodolistType> => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(td => td.id !== action.id)
    }
    case 'ADD-TODOLIST': {
      return [...state,
        {id: v1(), title: action.title, filter: 'All'}]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      let changeArr= state.find(tl => tl.id === action.id)
      if (changeArr) {
        changeArr.title = action.title
      }
      return [...state]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      state.find((td) => td.id === action.id ? td.filter = action.filter : '')
      return [...state]
    }

    default:
      throw new Error('Error! Action crash me! Error!')
  }

}