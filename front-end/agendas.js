const toggleBtn = document.getElementById("toggleThemeBtn");
  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
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
