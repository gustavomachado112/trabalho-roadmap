const form = document.getElementById('taskForm');
const taskList = document.getElementById('taskList');

const commentSection = document.getElementById('commentSection');
const selectedTaskName = document.getElementById('selectedTaskName');
const commentsList = document.getElementById('commentsList');
const commentForm = document.getElementById('commentForm');
const commentText = document.getElementById('commentText');

let tasks = JSON.parse(localStorage.getItem('tarefas')) || [];
let selectedTaskIndex = null;

function loadTasks() {
  tasks = JSON.parse(localStorage.getItem('tarefas')) || [];
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    taskList.innerHTML = '<p style="color:#ccc; text-align:center;">Nenhuma tarefa salva.</p>';
    commentSection.style.display = 'none';
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
      <button onclick="selectTask(${index})" style="margin-top:10px; margin-right:10px; padding:6px 12px; background:#4caf50; color:#fff; border:none; border-radius:6px; cursor:pointer;">Comentários</button>
      <button onclick="removeTask(${index})" style="margin-top:10px; padding:6px 12px; background:#764ba2; color:#fff; border:none; border-radius:6px; cursor:pointer;">Excluir</button>
    `;
    taskList.appendChild(div);
  });
  commentSection.style.display = 'none'; // oculta comentários ao recarregar lista
}

// Seleciona uma tarefa para ver/gerenciar comentários
function selectTask(index) {
  selectedTaskIndex = index;
  const task = tasks[index];
  selectedTaskName.textContent = `Comentários da tarefa: ${task.nome}`;
  loadComments();
  commentSection.style.display = 'block';
  commentText.value = '';
  commentText.focus();
}

// Carrega comentários da tarefa selecionada
function loadComments() {
  const task = tasks[selectedTaskIndex];
  commentsList.innerHTML = '';

  if (!task.comentarios || task.comentarios.length === 0) {
    commentsList.innerHTML = '<p style="color:#ccc; text-align:center;">Nenhum comentário ainda.</p>';
    return;
  }

  task.comentarios.forEach(c => {
    const p = document.createElement('p');
    p.innerHTML = `<span class="comment-date">${c.data}</span><br>${escapeHtml(c.texto)}`;
    commentsList.appendChild(p);
  });
}

// Função para escapar HTML nos comentários (evita injeção)
function escapeHtml(text) {
  return text.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

function removeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tarefas', JSON.stringify(tasks));
  loadTasks();
  selectedTaskIndex = null;
  commentSection.style.display = 'none';
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const novaTarefa = {
    nome: form.taskName.value.trim(),
    criacao: form.creationDate.value.trim(),
    limite: form.dueDate.value.trim(),
    descricao: form.description.value.trim(),
    comentarios: []
  };

  if (!novaTarefa.nome || !novaTarefa.criacao || !novaTarefa.limite || !novaTarefa.descricao) {
    alert('Por favor, preencha todos os campos!');
    return;
  }

  tasks.push(novaTarefa);
  localStorage.setItem('tarefas', JSON.stringify(tasks));

  form.reset();
  loadTasks();
});

// Adicionar comentário
commentForm.addEventListener('submit', e => {
  e.preventDefault();

  if (selectedTaskIndex === null) return alert('Selecione uma tarefa primeiro!');

  const texto = commentText.value.trim();
  if (!texto) return;

  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });

  const novoComentario = {
    texto: texto,
    data: dataFormatada
  };

  tasks[selectedTaskIndex].comentarios.push(novoComentario);
  localStorage.setItem('tarefas', JSON.stringify(tasks));
  commentText.value = '';
  loadComments();
});

loadTasks();
