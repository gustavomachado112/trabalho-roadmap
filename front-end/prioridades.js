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

  // Limpa os campos
  form.reset();
});
