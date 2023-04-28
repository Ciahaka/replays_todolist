import React, {useCallback} from 'react';
import '../App.css';
import {TasksType, Todolist} from './Todolist';

import {UniversalInput} from '../universal input form/UniversalInput';
import {Avatar, Breadcrumb, Card, Col, Layout, Menu, Row} from 'antd';
import 'antd/dist/reset.css';
import Title from 'antd/es/typography/Title';
import ava from '../multimedia/images/elvis.svg'
import {
  addTodolistAC, changeTodolistFilterAC,
  changeTodolistTitleAC,
  removeTodolistAC,
} from '../BLL/todolist reducer/todolist_reducer';
import {
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
} from '../BLL/tasks reducer/tasks_reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../BLL/store/store';

const {Header, Content, Footer} = Layout;

export type ChangeFilterType = 'All' | 'Active' | 'Completed'

export type TodolistType = {
  id: string
  title: string
  filter: ChangeFilterType
}
export type  TasksStateType = {
  [key: string]: TasksType[]
}

function AppRedux() {
  console.log('!!AppRedux!!')
  const dispatch = useDispatch()

  const todos = useSelector<RootStateType,TodolistType[]>(state => state.todos)
  const tasks = useSelector<RootStateType,TasksStateType>(state => state.tasks)

  const addTask = useCallback( (title: string, tLID: string) => dispatch(addTaskAC(title, tLID)),[])
  const removeTasks = useCallback( (taskID: string, tLID: string) => dispatch(removeTaskAC(taskID, tLID)),[])
  const changeStatusCheckbox = useCallback((taskID: string, isDone: boolean, tLID: string) => {
    dispatch(changeTaskStatusAC(taskID, isDone, tLID))
  },[])
  const changeTaskTitle = useCallback ((taskID: string, tLID: string, newTitle: string) => {
    dispatch(changeTaskTitleAC(taskID, tLID, newTitle))
  },[])

  const addTodolist =useCallback ((title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  },[])
  const removeTodo = useCallback( (tLID: string) => dispatch(removeTodolistAC(tLID)),[])
  const changeFilter =useCallback( (tdLID: string, value: ChangeFilterType) => {
    dispatch(changeTodolistFilterAC(tdLID, value))
  },[])
  const changeTodoTitle =useCallback( (tLID: string, newTitle: string) => {
    dispatch(changeTodolistTitleAC(tLID, newTitle))
  },[])

  return (
    <Layout className="layout">
      <Header style={{position: 'sticky', top: 0, zIndex: 1, width: '100%'}}>
        <Row>
          <Col span={5}>
            <div className="logo">
              <Title className={'title'} level={3}>TODOLIST</Title>
            </div>
          </Col>
          <Col span={18}>
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              items={new Array(3).fill(null).map((_, index) => {
                const key = index + 1;
                return {
                  key,
                  label: `Todo ${key}`,
                };
              })}
            />
          </Col>
          <Col span={1}>
            <Avatar style={{backgroundColor: 'white'}}
                    size={54}
                    src={<img src={ava} alt={'avatar'}/>}/>
          </Col>
        </Row>
      </Header>
      <Layout>
        <Content className="site-layout" style={{padding: '0 50px'}}>
          <Row>
            <Col>
              <Breadcrumb style={{margin: '16px 0'}}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Todolist</Breadcrumb.Item>
                <Breadcrumb.Item>Redux</Breadcrumb.Item>
              </Breadcrumb>
            </Col>
          </Row>

          <div className="site-layout-content">
            <Row gutter={[20, 20]}>
              <Col span={'100px'}>
                <UniversalInput addInputForm={addTodolist}/>
              </Col>
              {todos.map((td) => {
                let filteredTasks = tasks[td.id]
                let tasksForTodolist = filteredTasks

                if (td.filter === 'Active') {
                  tasksForTodolist = filteredTasks.filter((t) => !t.isDone)
                }
                if (td.filter === 'Completed') {
                  tasksForTodolist = filteredTasks.filter((t) => t.isDone)
                }
                return <>
                  <Col span={'auto'}>
                    <Card hoverable>
                      <Todolist key={td.id}
                                id={td.id}
                                title={td.title}
                                filter={td.filter}
                                tasks={tasksForTodolist}
                                removeTasks={removeTasks}
                                removeTodo={removeTodo}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                statusCheckbox={changeStatusCheckbox}
                                changeTaskTitle={changeTaskTitle}
                                changeTodoTitle={changeTodoTitle}
                      />
                    </Card>
                  </Col>
                </>
              })}
            </Row>
          </div>
        </Content>
      </Layout>
      <Footer style={{textAlign: 'center', color: 'white', background: 'gray'}}>Todolist ©2023 Ant Design by Mamkin
        Developer</Footer>
    </Layout>

  );
}

export default AppRedux;
