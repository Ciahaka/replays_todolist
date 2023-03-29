import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type ChangeFilterType = 'All' | 'Active' | 'Completed'


function App() {
  let [tasks, setTasks] = useState([
    {id: v1(), title: 'HTML&CSS', isDone: true},
    {id: v1(), title: 'JS', isDone: true},
    {id: v1(), title: 'ReactJS', isDone: false},
    {id: v1(), title: 'Rest API', isDone: true},
    {id: v1(), title: 'GraphQL', isDone: false},
  ])
  let [filter, setFilter] = useState<ChangeFilterType>('All')


  const removeTasks = (id: string) => {
    tasks = tasks.filter(t => t.id !== id)
    setTasks(tasks)
  }
  const changeFilter = (value: ChangeFilterType) => setFilter(value)
  const addTask = (title:string) => {
    let newTask = {id: v1(), title, isDone: false}
    const newTasksArr = [newTask,...tasks]
    setTasks(newTasksArr)

  }

  let filteredTasks = tasks
  if (filter === 'Active') {
    filteredTasks = tasks.filter((t) => !t.isDone)
  }
  if (filter === 'Completed') {
    filteredTasks = tasks.filter((t) => t.isDone)
  }


  return (
    <div className="App">
      <Todolist title={'What to learn'}
                tasks={filteredTasks}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
                addTask={addTask}
      />
    </div>

  );
}

export default App;
