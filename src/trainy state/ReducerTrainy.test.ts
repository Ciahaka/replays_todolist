import {userReducer} from './ReducerTrainy'

test('user reducer should increment only age', () => {
  const startState = {age: 42, childrenCount: 1, name: 'Iscander'}

  const endState = userReducer(startState, {type: 'INCREMENT-AGE'})

  expect(endState.age).toBe(43)
  expect(endState.childrenCount).toBe(1)
})

test('user reducer should increment only childrenCount', () => {
  const startState = {age: 42, childrenCount: 1, name: 'Iscander'}
  const endState = userReducer(startState, {type: 'INCREMENT-CHILDREN-COUNT'})
  expect(endState.childrenCount).toBe(2)
  expect(endState.age).toBe(42)
})