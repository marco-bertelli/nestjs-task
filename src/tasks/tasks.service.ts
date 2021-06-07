import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;

    let tasks = this.getAllTasks();

    //filtro stato
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    //applico search
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ){
          return true;
        }
        else return false;
      });
    }

    //ritorno tutto
    return tasks;
  }

  getTaskById(id: string): Task {
   // recupero il task
   const found = this.tasks.find((task)=>task.id===id);

   // se non esiste lancio un errore
   if (!found) {
     throw new NotFoundException(`Task with ID "${id}" not found`);
   }

   // altrimenti ritorno
   return found;
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

  deleteTaskById(id: string) {
    const found = this.getTaskById(id);

    for (var i = this.tasks.length - 1; i >= 0; i--) {
      if (this.tasks[i].id === found.id) {
        this.tasks.splice(i, 1);
      }
    }
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
