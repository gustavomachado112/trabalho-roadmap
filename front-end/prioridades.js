// Dark Mode
const modoBtn = document.getElementById('modo-btn');
const body = document.body;
const temaSalvo = localStorage.getItem('tema') || 'light';

if (temaSalvo === 'dark') {
  body.classList.add('dark-mode');
  modoBtn.textContent = '☀️';
}

modoBtn.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const novoTema = body.classList.contains('dark-mode') ? 'dark' : 'light';
  localStorage.setItem('tema', novoTema);
  modoBtn.textContent = novoTema === 'dark' ? '☀️' : '🌙';
});

// Notificações
const notifBtn = document.getElementById('notificacoes-btn');
const notifBox = document.getElementById('notificacoes');
notifBtn.addEventListener('click', () => {
  notifBox.classList.toggle('visivel');
});

// Prioridades
const form = document.getElementById('form-prioridade');
const lista = document.getElementById('lista-prioridades');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome').value.trim();
  const urgencia = document.getElementById('urgencia').value;
  const descricao = document.getElementById('descricao').value.trim();

  if (!nome || !urgencia || !descricao) {
    alert("Preencha todos os campos!");
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `
    <strong>${nome}</strong>
    <span class="urgencia-${urgencia}">Urgência: ${urgencia}</span><br/>
    <span>${descricao}</span>
  `;

  lista.appendChild(li);

  form.reset();
});
