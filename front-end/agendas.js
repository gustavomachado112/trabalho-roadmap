const modoBtn = document.getElementById("modo-btn");
const body = document.body;

modoBtn.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
  if (body.classList.contains("dark-mode")) {
    modoBtn.textContent = "☀️";
  } else {
    modoBtn.textContent = "🌙";
  }
});

// Lógica simples de submissão dos formulários (sem banco de dados)
document.getElementById("form-compartilhamento").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Tarefa compartilhada com sucesso!");
  e.target.reset();
});

document.getElementById("form-calendario").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Calendário adicionado!");
  e.target.reset();
});
