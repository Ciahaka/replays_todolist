import React from 'react'
import {Provider} from "react-redux";

import {combineReducers, legacy_createStore} from "redux";

import {v1} from "uuid";
import {todolistReducer} from '../BLL/todolist reducer/todolist_reducer';
import {tasksReducer} from '../BLL/tasks reducer/tasks_reducer';
import {RootStateType} from '../BLL/store/store';

const rootReducer = combineReducers({
  todos: todolistReducer,
  tasks: tasksReducer
})

const initialGlobalState = {
  todos: [
    {id: "tLID_1", title: "What to learn", filter: "all"},
    {id: "tLID_2", title: "What to buy", filter: "all"}
  ] ,
  tasks: {
    ["tLID_1"]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: false}
    ],
    ["tLID_2"]: [
      {id: v1(), title: "Milk", isDone: false},
      {id: v1(), title: "React Book", isDone: true}
    ]
  }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as RootStateType);


export const DecoratorAppRedux = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>
}
