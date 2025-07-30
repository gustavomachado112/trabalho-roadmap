const modoBtn = document.getElementById("modo-btn");
const body = document.body;

if (modoBtn) {
  modoBtn.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
    modoBtn.textContent = body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });
}

// Confirmação ao compartilhar
document.getElementById("form-compartilhamento").addEventListener("submit", (e) => {
  e.preventDefault();
  const confirmar = confirm("Tem certeza que deseja compartilhar esta tarefa?");
  if (confirmar) {
    alert("Tarefa compartilhada com sucesso!");
    e.target.reset();
  }
});

// Confirmação ao adicionar calendário
document.getElementById("form-calendario").addEventListener("submit", (e) => {
  e.preventDefault();
  const confirmar = confirm("Deseja realmente adicionar este calendário?");
  if (confirmar) {
    alert("Calendário adicionado!");
    e.target.reset();
  }
});
