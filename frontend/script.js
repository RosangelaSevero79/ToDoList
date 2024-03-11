// Função para carregar as tarefas da API e exibi-las na lista
function loadTasks() {
  fetch('http://localhost:3000/tasks')
    .then(response => response.json())
    .then(tasks => {
      var ul = document.getElementById("taskList");
      ul.innerHTML = ""; // Limpa a lista antes de carregar as novas tarefas

      tasks.forEach(task => {
        var li = document.createElement("li");
        
        // Cria um checkbox para cada tarefa
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        checkbox.addEventListener("change", () => {
          fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ completed: checkbox.checked }) // Atualiza o estado de concluído da tarefa
          })
          .then(() => {
            loadTasks(); // Recarrega a lista de tarefas após marcar como concluída
          })
          .catch(error => {
            console.error('Erro ao marcar a tarefa como concluída:', error);
          });
        });

        // Adiciona o texto da tarefa
        var taskText = document.createElement("span");
        taskText.textContent = task.description;
        li.appendChild(checkbox);
        li.appendChild(taskText);

        // Cria um botão de exclusão para cada tarefa na lista
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Impede que o evento de clique se propague para o item da lista
          fetch(`http://localhost:3000/tasks/${task.id}`, {
            method: 'DELETE'
          })
          .then(() => {
            loadTasks(); // Recarrega a lista de tarefas após excluir a tarefa
          })
          .catch(error => {
            console.error('Erro ao excluir a tarefa:', error);
          });
        });

        // Adiciona um botão de impressão para cada tarefa na lista
        var printButton = document.createElement("button");
        printButton.textContent = "Imprimir";
        printButton.classList.add("print-button");
        printButton.addEventListener("click", (event) => {
          event.stopPropagation(); // Impede que o evento de clique se propague para o item da lista
          window.print(); // Abre a janela de impressão do navegador
        });

        li.appendChild(deleteButton);
        li.appendChild(printButton);

        ul.appendChild(li);
      });
    })
    .catch(error => {
      console.error('Erro ao carregar as tarefas:', error);
    });
}

// Função para adicionar uma nova tarefa usando a API
function addTask() {
  var input = document.getElementById("taskInput");
  var taskDescription = input.value.trim();

  if (taskDescription !== "") {
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ description: taskDescription })
    })
    .then(response => response.json())
    .then(newTask => {
      loadTasks(); // Recarrega a lista de tarefas após adicionar uma nova tarefa
      input.value = ""; // Limpa o campo de entrada
    })
    .catch(error => {
      console.error('Erro ao adicionar a tarefa:', error);
    });
  } else {
    alert("Por favor, insira uma tarefa válida.");
  }
}

// Carrega as tarefas ao carregar a página
window.onload = function() {
  loadTasks();
};
