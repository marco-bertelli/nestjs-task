import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string){
    for (var i = this.tasks.length - 1; i >= 0; i--) {
      if (this.tasks[i].id === id) {
        this.tasks.splice(i, 1);
      }
    }
  }

  updateTaskStatus(id:string,status:TaskStatus){
      const task = this.getTaskById(id);
      task.status = status;
      return task;
  }
}
