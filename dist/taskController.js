"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskController = void 0;
const task_1 = require("./task");
class TaskController {
    constructor() {
        this.tasks = [];
    }
    createTask(description) {
        const newTask = new task_1.Task(this.tasks.length + 1, description, false);
        this.tasks.push(newTask);
        return newTask;
    }
    getTasks() {
        return this.tasks;
    }
    completeTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks[taskIndex].completed = true;
            return this.tasks[taskIndex];
        }
        return null;
    }
    removeTask(id) {
        const taskIndex = this.tasks.findIndex(task => task.id === id);
        if (taskIndex !== -1) {
            this.tasks.splice(taskIndex, 1);
            return true;
        }
        return false;
    }
}
exports.TaskController = TaskController;
