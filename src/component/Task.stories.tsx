import type {Meta, StoryObj} from '@storybook/react';
import {Task} from './Task';

const meta = {
  title: 'Todolist/Task',
  component: Task,
  tags: ['autodocs'],
  argTypes: {
    removeTasks:{
      description:'Remove Tasks',
      action:'Таска удалена'
    },
    statusCheckbox:{
      description:'Change Status Checkbox',
      action:'Статус таски изменился'
    },
    changeTaskTitle:{
      description:'Change Task Title',
      action:'Название таски изменилось'
    },
  },
  args:{
    task:{id:'8fd8dh8',title:'JS',isDone:false},
    tlID:'3474yj6hd6fh'
  }
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskNotIsDoneStory: Story = {
};
export const TaskIsDoneStory: Story = {
  args:{
    task:{id:'56h8',title:'HTML',isDone:true},
    tlID:'3474yj6hd6fh'
  }
};
