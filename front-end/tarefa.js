const form = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tarefas')) || [];
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<p style="color:#ccc; text-align:center;">Nenhuma tarefa salva.</p>';
    return;
  }

  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.classList.add('task-item');
    div.innerHTML = `
      <h3>${task.nome}</h3>
      <p><strong>Data de Criação:</strong> ${task.criacao}</p>
      <p><strong>Data Limite:</strong> ${task.limite}</p>
      <p><strong>Descrição:</strong> ${task.descricao}</p>
      <button onclick="removeTask(${index})" style="margin-top:10px; padding:6px 12px; background:#764ba2; color:#fff; border:none; border-radius:6px; cursor:pointer;">Excluir</button>
    `;
    taskList.appendChild(div);
  });
}

function removeTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tarefas')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tasks));
  loadTasks();
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const novaTarefa = {
    nome: form.taskName.value.trim(),
    criacao: form.creationDate.value.trim(),
    limite: form.dueDate.value.trim(),
    descricao: form.description.value.trim(),
  };

  if (!novaTarefa.nome || !novaTarefa.criacao || !novaTarefa.limite || !novaTarefa.descricao) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  const tasks = JSON.parse(localStorage.getItem('tarefas')) || [];
  tasks.push(novaTarefa);
  localStorage.setItem('tarefas', JSON.stringify(tasks));

  form.reset();
  loadTasks();
});

loadTasks();
