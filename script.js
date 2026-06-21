// ---------- state (in-memory only; no localStorage) ----------
  let tasks = [];
  let nextId = 1;
  let searchQuery = "";

  const pendingList = document.getElementById('pendingList');
  const doneList = document.getElementById('doneList');
  const pendingEmpty = document.getElementById('pendingEmpty');
  const doneEmpty = document.getElementById('doneEmpty');
  const statTotal = document.getElementById('statTotal');
  const statPending = document.getElementById('statPending');
  const statDone = document.getElementById('statDone');

  function formatDate(dateStr) {
    if (!dateStr) return null;
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  function matchesSearch(task) {
    if (!searchQuery) return true;
    return task.text.toLowerCase().includes(searchQuery.toLowerCase());
  }

  function checkIcon() {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>';
  }

  function trashIcon() {
    return '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path><path d="M10 11v6"></path><path d="M14 11v6"></path><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path></svg>';
  }

  function buildTaskEl(task) {
    const li = document.createElement('li');
    li.className = 'task' + (task.done ? ' is-done' : '');
    li.dataset.id = task.id;

    const dateLabel = formatDate(task.due);
    const metaParts = [];
    metaParts.push('<span class="badge ' + task.priority + '">' + task.priority + '</span>');
    if (dateLabel) metaParts.push('<span class="badge date">' + dateLabel + '</span>');

    li.innerHTML =
      '<button class="check" aria-label="Toggle complete">' + checkIcon() + '</button>' +
      '<div class="task-body">' +
        '<div class="task-text"></div>' +
        '<div class="task-meta">' + metaParts.join('') + '</div>' +
      '</div>' +
      '<button class="delete-btn" aria-label="Delete task">' + trashIcon() + '</button>';

    li.querySelector('.task-text').textContent = task.text;
    li.querySelector('.check').addEventListener('click', () => toggleDone(task.id));
    li.querySelector('.delete-btn').addEventListener('click', () => removeTask(task.id, li));

    return li;
  }

  function render() {
    const visible = tasks.filter(matchesSearch);
    const pending = visible.filter(t => !t.done);
    const done = visible.filter(t => t.done);

    pendingList.innerHTML = '';
    pending.forEach(t => pendingList.appendChild(buildTaskEl(t)));
    pendingEmpty.style.display = pending.length ? 'none' : 'block';

    doneList.innerHTML = '';
    done.forEach(t => doneList.appendChild(buildTaskEl(t)));
    doneEmpty.style.display = done.length ? 'none' : 'block';

    statTotal.textContent = tasks.length;
    statPending.textContent = tasks.filter(t => !t.done).length;
    statDone.textContent = tasks.filter(t => t.done).length;
  }

  function addTask(text, priority, due) {
    tasks.unshift({ id: nextId++, text, priority, due, done: false });
    render();
  }

  function toggleDone(id) {
    const t = tasks.find(t => t.id === id);
    if (t) t.done = !t.done;
    render();
  }

  function removeTask(id, el) {
    el.classList.add('removing');
    setTimeout(() => {
      tasks = tasks.filter(t => t.id !== id);
      render();
    }, 220);
  }

  document.getElementById('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('taskInput');
    const text = input.value.trim();
    if (!text) return;
    const priority = document.getElementById('prioritySelect').value;
    const due = document.getElementById('dueInput').value;
    addTask(text, priority, due);
    input.value = '';
    document.getElementById('dueInput').value = '';
    input.focus();
  });

  document.getElementById('searchInput').addEventListener('input', (e) => {
    searchQuery = e.target.value;
    render();
  });

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('click', () => {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    body.setAttribute('data-theme', isDark ? 'light' : 'dark');
    themeToggle.textContent = isDark ? '🌙' : '☀️';
  });

  // seed a couple of example tasks so the app isn't empty on first view
  addTask('Review assignment brief', 'medium', '');
  addTask('Set up AntiGravity agent roles', 'high', '');
  tasks[0].done = true;
  render();
