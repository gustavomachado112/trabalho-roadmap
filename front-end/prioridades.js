// Dark Mode Toggle
const toggle = document.getElementById("darkModeToggle");
toggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});

// Formulário de prioridades
const form = document.getElementById("formPrioridade");
const listaPrioridades = document.getElementById("prioridadesList");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const confirmacao = confirm("Deseja realmente adicionar esta prioridade?");
  if (!confirmacao) return;

  const nome = document.getElementById("nome").value;
  const urgencia = document.getElementById("urgencia").value;
  const descricao = document.getElementById("descricao").value;
  const lista = document.getElementById("lista").value;

  const div = document.createElement("div");
  div.innerHTML = `
    <h3>${nome}</h3>
    <p><strong>Urgência:</strong> ${urgencia}</p>
    <p><strong>Descrição:</strong> ${descricao}</p>
    <p><strong>Lista:</strong> ${lista}</p>
    <hr>
  `;

  listaPrioridades.appendChild(div);

  form.reset();
});
