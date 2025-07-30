
const toggle = document.getElementById('toggle');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
    toggle.checked = true;
}

toggle.addEventListener('change', () => {
    body.classList.toggle('dark-mode');
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

const form = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;

    if (!title || !description) return;

    if (!confirm('Você tem certeza que quer criar essa tarefa?')) return;

    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <button class="delete-btn">Excluir</button>
    `;

    taskItem.querySelector('.delete-btn').addEventListener('click', () => {
        if (confirm('Você tem certeza que quer excluir esta tarefa?')) {
            taskItem.remove();
        }
    });

    taskList.appendChild(taskItem);
    form.reset();
});
