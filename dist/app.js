"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const taskController_1 = require("./taskController");
const path_1 = __importDefault(require("path")); // Importe o módulo 'path' do Node.js
const app = (0, express_1.default)();
// Configuração para servir arquivos estáticos do frontend
app.use(express_1.default.static(path_1.default.join(__dirname, "../frontend")));
const port = 3000;
app.use(express_1.default.json());
const taskController = new taskController_1.TaskController();
app.get("/tasks", (req, res) => {
    res.json(taskController.getTasks());
});
app.post("/tasks", (req, res) => {
    const { description } = req.body;
    const newTask = taskController.createTask(description);
    res.json(newTask);
});
app.put("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const updatedTask = taskController.completeTask(taskId);
    if (updatedTask) {
        res.json(updatedTask);
    }
    else {
        res.status(404).json({ error: "Task not found" });
    }
});
app.delete("/tasks/:id", (req, res) => {
    const taskId = parseInt(req.params.id);
    const success = taskController.removeTask(taskId);
    if (success) {
        res.json({ success: true });
    }
    else {
        res.status(404).json({ error: "Task not found" });
    }
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
