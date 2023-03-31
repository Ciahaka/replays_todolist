import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type ChangeFilterType = 'All' | 'Active' | 'Completed'

type TodolistType = {
  id: string
  title: string
  filter: ChangeFilterType
}

function App() {
  const [todos, setTodos] = useState<TodolistType[]>([
    {id: v1(), title: 'Что учить?', filter: 'All'},
    {id: v1(), title: 'Что купить?', filter: 'All'},
  ])

  let [tasks, setTasks] = useState([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'Rest API', isDone: true},
    {id: v1(), title: 'GraphQL', isDone: false},
  ])

  const removeTasks = (taskID: string) => {
    tasks = tasks.filter(t => t.id !== taskID)
    setTasks(tasks)
  }
  const changeFilter = (tdID: string, value: ChangeFilterType) => {

    todos.find((td) => td.id === tdID ? td.filter = value : '')
    setTodos([...todos])
  }

  const addTask = (title: string) => {
    let newTask = {id: v1(), title, isDone: false}
    const newTasksArr = [newTask, ...tasks]
    setTasks(newTasksArr)
  }
  const changeStatusCheckbox = (taskID: string, isDone: boolean) => {
    let newStatusTask = tasks.find(t => t.id === taskID)
    if (newStatusTask) {
      newStatusTask.isDone = isDone
    }
    setTasks([...tasks])
  }

  return (
    <div className="App">
      {todos.map((td) => {

        let filteredTasks = tasks
        if (td.filter === 'Active') {
          filteredTasks = tasks.filter((t) => !t.isDone)
        }
        if (td.filter === 'Completed') {
          filteredTasks = tasks.filter((t) => t.isDone)
        }
        return <Todolist key={td.id}
                         id={td.id}
                         title={td.title}
                         tasks={filteredTasks}
                         removeTasks={removeTasks}
                         changeFilter={changeFilter}
                         addTask={addTask}
                         statusCheckbox={changeStatusCheckbox}
                         filter={td.filter}
        />
      })}

    </div>
  );
}

export default App;
