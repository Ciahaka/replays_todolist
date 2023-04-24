import {combineReducers, createStore} from 'redux';
import {todolistReducer} from '../todolist reducer/todolist_reducer';
import {tasksReducer} from '../tasks reducer/tasks_reducer';

export type RootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
  todos: todolistReducer,
  tasks: tasksReducer
})
export const store = createStore(rootReducer) //<--- заменить на configureStore при подключении Redux Toolkit.

// @ts-ignore
window.store = store