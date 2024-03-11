import express, { Request, Response } from "express";
import { TaskController } from "./taskController";
import path from "path"; // Importe o módulo 'path' do Node.js

const app = express();

// Configuração para servir arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, "../frontend")));

const port = 3000;

app.use(express.json());

const taskController = new TaskController();

app.get("/tasks", (req: Request, res: Response) => {
  res.json(taskController.getTasks());
});

app.post("/tasks", (req: Request, res: Response) => {
  const { description } = req.body;
  const newTask = taskController.createTask(description);
  res.json(newTask);
});

app.put("/tasks/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const updatedTask = taskController.completeTask(taskId);
  if (updatedTask) {
    res.json(updatedTask);
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.delete("/tasks/:id", (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  const success = taskController.removeTask(taskId);
  if (success) {
    res.json({ success: true });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
