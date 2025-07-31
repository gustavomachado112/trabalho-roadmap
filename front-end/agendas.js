
  const toggleBtn = document.getElementById("modo-btn");
  const body = document.body;

  const temaSalvo = localStorage.getItem('tema') || 'light';
  if (temaSalvo === 'dark') {
    body.classList.add('dark-mode');
    toggleBtn.textContent = '☀️';
  }

  toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const novoTema = body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('tema', novoTema);
    toggleBtn.textContent = novoTema === 'dark' ? '☀️' : '🌙';
  });

  const notificationBtn = document.getElementById("notificationBtn");
  const notificationDropdown = document.getElementById("notificationDropdown");

  notificationBtn.addEventListener("click", () => {
    const isHidden = notificationDropdown.hasAttribute("hidden");
    if (isHidden) {
      notificationDropdown.removeAttribute("hidden");
    } else {
      notificationDropdown.setAttribute("hidden", "");
    }
  });

  document.addEventListener("click", e => {
    if (!notificationBtn.contains(e.target) && !notificationDropdown.contains(e.target)) {
      notificationDropdown.setAttribute("hidden", "");
    }
  });
