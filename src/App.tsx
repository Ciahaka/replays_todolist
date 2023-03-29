import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type ChangeFilterType = 'All' | 'Active' | 'Completed'


function App() {
  let [tasks, setTasks] = useState([
    {id: 1, title: 'HTML&CSS', isDone: true},
    {id: 2, title: 'JS', isDone: true},
    {id: 3, title: 'ReactJS', isDone: false},
    {id: 4, title: 'Rest API', isDone: true},
    {id: 5, title: 'GraphQL', isDone: false},
  ])
  let [filter, setFilter] = useState<ChangeFilterType>('All')


  const removeTasks = (id: number) => {
    tasks = tasks.filter(t => t.id !== id)
    setTasks(tasks)
  }
  const changeFilter = (value:ChangeFilterType)=> setFilter(value)

  let filteredTasks = tasks
  if (filter ==='Active' ){
    filteredTasks = tasks.filter((t)=>!t.isDone)
  }
  if (filter ==='Completed' ){
    filteredTasks = tasks.filter((t)=>t.isDone)
  }


  return (
    <div className="App">
      <Todolist title={'What to learn'}
                tasks={filteredTasks}
                removeTasks={removeTasks}
                changeFilter={changeFilter}
      />
    </div>

  );
}

export default App;
