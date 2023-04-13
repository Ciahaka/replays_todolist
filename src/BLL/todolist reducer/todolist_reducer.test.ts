
import {todolistReducer} from './todolist_reducer';
import { v1 } from 'uuid'
import {ChangeFilterType, TodolistType} from '../../component/App';


test('correct todolist should be removed', () => {
  let tLID_1 = v1()
  let tLID_2 = v1()

  const startState: Array<TodolistType> = [
    {id: tLID_1, title: 'What to learn', filter: 'All'},
    {id: tLID_2, title: 'What to buy', filter: 'All'}
  ]

  const endState = todolistReducer(startState, {type: 'REMOVE-TODOLIST', id: tLID_1})

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(tLID_2)
})
test('correct todolist should be added', () => {
  let tLID_1 = v1()
  let tLID_2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistType> = [
    {id: tLID_1, title: 'What to learn', filter: 'All'},
    {id: tLID_2, title: 'What to buy', filter: 'All'}
  ]

  const endState = todolistReducer(startState, {type: 'ADD-TODOLIST', title: newTodolistTitle})

  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newTodolistTitle)
})
test('correct todolist should change its name', () => {
  let tLID_1 = v1()
  let tLID_2 = v1()

  let newTodolistTitle = 'New Todolist'

  const startState: Array<TodolistType> = [
    {id: tLID_1, title: 'What to learn', filter: 'All'},
    {id: tLID_2, title: 'What to buy', filter: 'All'}
  ]

  const action = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: tLID_2,
    title: newTodolistTitle
  }

  const endState = todolistReducer(startState, action)

  expect(endState[0].title).toBe('What to learn')
  expect(endState[1].title).toBe(newTodolistTitle)
})
test('correct filter of todolist should be changed', () => {
  let tLID_1 = v1()
  let tLID_2 = v1()

  let newFilter: ChangeFilterType = 'Completed'

  const startState: Array<TodolistType> = [
    {id: tLID_1, title: 'What to learn', filter: 'All'},
    {id: tLID_2, title: 'What to buy', filter: 'All'}
  ]

  const action = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: tLID_2,
    filter: newFilter
  }

  const endState = todolistReducer(startState, action)

  expect(endState[0].filter).toBe('All')
  expect(endState[1].filter).toBe(newFilter)
})
