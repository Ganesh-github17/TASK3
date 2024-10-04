let tasks = [];

function showNotification(message) {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000); // Hide after 3 seconds
}

function addTask() {
    const taskInput = document.getElementById('task-input');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        showNotification('Please enter a task!'); // Notification for empty task
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(task);
    taskInput.value = '';
    showNotification('Task added successfully!'); // Notification for task added
    renderTasks();
}

function renderTasks() {
    const pendingTasksList = document.getElementById('pending-tasks');
    const completedTasksList = document.getElementById('completed-tasks');
    
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;

        const completeBtn = document.createElement('button');
        completeBtn.textContent = 'Complete';
        completeBtn.className = 'complete-btn';
        completeBtn.onclick = () => markTaskComplete(task.id);

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'edit-btn';
        editBtn.onclick = () => editTask(task.id);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteTask(task.id);

        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        if (task.completed) {
            li.classList.add('completed');
            completedTasksList.appendChild(li);
        } else {
            pendingTasksList.appendChild(li);
        }
    });
}

function markTaskComplete(taskId) {
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
    );
    showNotification('Task marked as complete!'); // Notification for task completed
    renderTasks();
}

function editTask(taskId) {
    const task = tasks.find(task => task.id === taskId);
    const taskInput = document.getElementById('task-input');

    taskInput.value = task.text;
    deleteTask(taskId); // Delete the original task
}

function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    showNotification('Task deleted!'); // Notification for task deleted
    renderTasks();
}
