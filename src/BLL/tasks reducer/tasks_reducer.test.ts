import {TasksStateType} from '../../component/App';
import {
  addTaskAC, addTaskActionType,
  changeTaskStatusAC,
  changeTaskStatusActionType, changeTaskTitleAC,
  removeTaskAC,
  tasksReducer
} from './tasks_reducer';
import {addTodolistAC} from '../todolist reducer/todolist_reducer';

test('correct task should be deleted from correct array', () => {
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

  const action = removeTaskAC('2', 'todolistId2')

  const endState = tasksReducer(startState, action)

  expect(endState).toEqual({
    'todolistId1': [
      {id: '1', title: 'CSS', isDone: false},
      {id: '2', title: 'JS', isDone: true},
      {id: '3', title: 'React', isDone: false}
    ],
    'todolistId2': [
      {id: '1', title: 'bread', isDone: false},
      {id: '3', title: 'tea', isDone: false}
    ]
  })
})
test('correct task should be added to correct array', () => {
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

  const action:addTaskActionType = addTaskAC('juce', 'todolistId2')

  const endState:TasksStateType = tasksReducer(startState, action)

  expect(endState['todolistId1'].length).toBe(3)
  expect(endState['todolistId2'].length).toBe(4)
  expect(endState['todolistId2'][0].id).toBeDefined()
  expect(endState['todolistId2'][0].title).toBe('juce')
  expect(endState['todolistId2'][0].isDone).toBe(false)
})
test('status of specified task should be changed', () => {
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

  const action:changeTaskStatusActionType = changeTaskStatusAC('2', false, 'todolistId2')

  const endState:TasksStateType = tasksReducer(startState, action)

  expect(endState['todolistId2'][1].isDone).toBe(false)
  expect(endState['todolistId1'][1].isDone).toBe(true)
})

test('title of specified task should be changed', () => {
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

  const action = changeTaskTitleAC('3', 'Redux', 'todolistId1')

  const endState:TasksStateType = tasksReducer(startState, action)

  expect(endState['todolistId1'][2].title).toBe('Redux')
  expect(endState['todolistId2'][2].title).toBe('tea')
  expect(endState['todolistId1'].length).toBe(3)
})
test('new array should be added when new todolist is added', () => {
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

  const action = addTodolistAC('new todolist')

  const endState = tasksReducer(startState, action)


  const keys = Object.keys(endState)
  const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
  if (!newKey) {
    throw Error('new key should be added')
  }

  expect(keys.length).toBe(3)
  expect(endState[newKey]).toEqual([])
})




