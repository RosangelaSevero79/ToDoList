import { Task } from "./task";

export class TaskController {
  private tasks: Task[] = [];

  createTask(description: string): Task {
    const newTask = new Task(this.tasks.length + 1, description, false);
    this.tasks.push(newTask);
    return newTask;
  }

  getTasks(): Task[] {
    return this.tasks;
  }

  completeTask(id: number): Task | null {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      this.tasks[taskIndex].completed = true;
      return this.tasks[taskIndex];
    }
    return null;
  }

  removeTask(id: number): boolean {
    const taskIndex = this.tasks.findIndex(task => task.id === id);
    if (taskIndex !== -1) {
      this.tasks.splice(taskIndex, 1);
      return true;
    }
    return false;
  }
}
