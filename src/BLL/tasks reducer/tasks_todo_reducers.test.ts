import {
  addTodolistAC,
  removeTodolistAC,
  removeTodolistActionType,
  todolistReducer
} from '../todolist reducer/todolist_reducer';
import {TasksStateType, TodolistType} from '../../component/App';
import {tasksReducer} from './tasks_reducer';

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {}
  const startTodolistState: Array<TodolistType> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistState = todolistReducer(startTodolistState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolist = endTodolistState[0].id

  expect(idFromTasks).toBe(action.id)
  expect(idFromTodolist).toBe(action.id)
})

test('property with todolistId should be deleted', () => {
  const startState: TasksStateType = {
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '2', title: 'milk', isDone: true},
      {id: '3', title: 'tea', isDone: false}
    ]
  }

  const action: removeTodolistActionType = removeTodolistAC('todolistId2')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState['todolistId2']).not.toBeDefined()
})
