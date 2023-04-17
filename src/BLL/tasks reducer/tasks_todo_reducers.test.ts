import {addTodolistAC, todolistReducer} from '../todolist reducer/todolist_reducer';
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
