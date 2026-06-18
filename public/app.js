const taskForm = document.getElementById('taskForm');
const tasksContainer = document.getElementById('tasksContainer');

async function fetchTasks() {
  try {
    const response = await fetch('/api/tasks');
    const tasks = await response.json();
    renderTasks(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    tasksContainer.innerHTML = '<p class="no-tasks">Error loading tasks.</p>';
  }
}

function renderTasks(tasks) {
  if (tasks.length === 0) {
    tasksContainer.innerHTML = '<p class="no-tasks">No tasks yet. Add one to get started!</p>';
    return;
  }

  const tasksList = document.createElement('ul');
  tasksList.className = 'tasks-list';

  tasks.forEach((task) => {
    const li = document.createElement('li');
    li.className = 'task-item';
    li.innerHTML = `
      <h3>${escapeHtml(task.name)}</h3>
      <p>${escapeHtml(task.description || '')}</p>
      <p class="task-due">Due: ${task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}</p>
      <span class="task-status ${task.status === 'completed' ? 'status-completed' : 'status-pending'}">
        ${task.status.charAt(0).toUpperCase() + task.status.slice(1)}
      </span>
      <div class="task-actions">
        <div style="flex: 1; display: flex; gap: 8px;">
          <select class="task-status-select" data-id="${task.id}">
            <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
            <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
          </select>
          <button type="button" class="btn-update" data-id="${task.id}">Update</button>
        </div>
        <button type="button" class="btn-delete" data-id="${task.id}">Delete</button>
      </div>
    `;

    const updateBtn = li.querySelector('.btn-update');
    const deleteBtn = li.querySelector('.btn-delete');
    const statusSelect = li.querySelector('.task-status-select');

    updateBtn.addEventListener('click', () => updateTask(task.id, statusSelect.value));
    deleteBtn.addEventListener('click', () => deleteTask(task.id));

    tasksList.appendChild(li);
  });

  tasksContainer.innerHTML = '';
  tasksContainer.appendChild(tasksList);
}

async function addTask(e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const description = document.getElementById('description').value.trim();
  const dueDate = document.getElementById('dueDate').value;

  if (!name) {
    alert('Task name is required');
    return;
  }

  try {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, description, dueDate: dueDate || null }),
    });

    if (response.ok) {
      taskForm.reset();
      fetchTasks();
    } else {
      alert('Error adding task');
    }
  } catch (error) {
    console.error('Error adding task:', error);
    alert('Error adding task');
  }
}

async function updateTask(id, status) {
  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    });

    if (response.ok) {
      fetchTasks();
    } else {
      alert('Error updating task');
    }
  } catch (error) {
    console.error('Error updating task:', error);
    alert('Error updating task');
  }
}

async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) return;

  try {
    const response = await fetch(`/api/tasks/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      fetchTasks();
    } else {
      alert('Error deleting task');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    alert('Error deleting task');
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

taskForm.addEventListener('submit', addTask);
fetchTasks();
