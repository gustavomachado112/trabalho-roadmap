// Notificações
notificationBtn.onclick = () =>
  notificationDropdown.toggleAttribute('hidden');

// Tema claro/escuro
const setTheme = theme => {
  document.body.classList.toggle('dark-mode', theme === 'dark');
  toggleThemeBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
  localStorage.setItem('theme', theme);
};
setTheme(localStorage.getItem('theme') || 'light');
toggleThemeBtn.onclick = () =>
  setTheme(document.body.classList.contains('dark-mode') ? 'light' : 'dark');

// Tarefas e comentários
const $ = id => document.getElementById(id);
const form = $('taskForm'), list = $('taskList'), section = $('commentSection');
const nameDisplay = $('selectedTaskName'), commentsBox = $('commentsList'), commentForm = $('commentForm');
let tasks = JSON.parse(localStorage.getItem('tarefas')) || [], current = null;

const saveTasks = () =>
  localStorage.setItem('tarefas', JSON.stringify(tasks));

const renderTasks = () => {
  list.innerHTML = tasks.length ? '' : '<p style="color:#ccc; text-align:center;">Nenhuma tarefa salva.</p>';
  tasks.forEach((t, i) => {
    const el = document.createElement('div');
    el.className = 'task-item';
    el.innerHTML = `
      <h3>${t.nome}</h3>
      <p><strong>Data de Criação:</strong> ${t.criacao}</p>
      <p><strong>Data Limite:</strong> ${t.limite}</p>
      <p><strong>Descrição:</strong> ${t.descricao}</p>
      <button onclick="select(${i})">Comentários</button>
      <button onclick="remove(${i})">Excluir</button>`;
    list.appendChild(el);
  });
  section.style.display = 'none';
};

const escape = s =>
  s.replace(/[&<>"']/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[c]));

window.select = i => {
  current = i;
  nameDisplay.textContent = `Comentários da tarefa: ${tasks[i].nome}`;
  renderComments();
  section.style.display = 'block';
  $('commentText').value = '';
};

const renderComments = () => {
  const c = tasks[current].comentarios || [];
  commentsBox.innerHTML = c.length
    ? c.map(e => `<p><span class="comment-date">${e.data}</span><br>${escape(e.texto)}</p>`).join('')
    : '<p style="color:#ccc; text-align:center;">Nenhum comentário ainda.</p>';
};

window.remove = i => {
  tasks.splice(i, 1);
  saveTasks();
  renderTasks();
};

form.onsubmit = e => {
  e.preventDefault();
  const t = {
    nome: form.taskName.value.trim(),
    criacao: form.creationDate.value,
    limite: form.dueDate.value,
    descricao: form.description.value.trim(),
    comentarios: []
  };
  if (Object.values(t).some(v => !v)) return alert('Preencha todos os campos!');
  tasks.push(t);
  saveTasks();
  form.reset();
  renderTasks();
};

commentForm.onsubmit = e => {
  e.preventDefault();
  if (current === null) return alert('Selecione uma tarefa!');
  const texto = $('commentText').value.trim();
  if (!texto) return;
  const data = new Date().toLocaleString('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
  tasks[current].comentarios.push({ texto, data });
  saveTasks();
  $('commentText').value = '';
  renderComments();
};

renderTasks();
