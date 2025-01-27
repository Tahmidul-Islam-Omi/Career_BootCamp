// taskManager.js

// Array to store tasks
let tasks = [];

// Load tasks from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

// Function to generate a unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Function to add a new task
const addTask = async (title, description, priority, dueDate) => {
    try {
        if (!title || !priority || !dueDate) {
            alert('Title, Priority, and Due Date are required!');
            return;
        }

        // Check for duplicate tasks
        const isDuplicate = tasks.some(task => task.title === title);
        if (isDuplicate) {
            alert('This task already exists!');
            return;
        }

        // Create a new task object
        const newTask = {
            id: generateId(),
            title,
            description,
            priority,
            dueDate,
            completed: false,
            createdAt: new Date().toISOString()
        };

        // Add the task to the tasks array
        tasks.push(newTask);

        // Save tasks to localStorage
        await saveTasks();

        // Render the updated task list
        renderTasks();
    } catch (error) {
        console.error('Error adding task:', error);
        alert('An error occurred while adding the task. Please try again.');
    }
};

// Function to delete a task by ID
const deleteTask = async (taskId) => {
    try {
        tasks = tasks.filter(task => task.id !== taskId);

        // Save tasks to localStorage
        await saveTasks();

        // Render the updated task list
        renderTasks();
    } catch (error) {
        console.error('Error deleting task:', error);
        alert('An error occurred while deleting the task. Please try again.');
    }
};

// Function to update a task by ID
const updateTask = async (taskId, updates) => {
    try {
        const taskIndex = tasks.findIndex(task => task.id === taskId);
        if (taskIndex === -1) {
            alert('Task not found!');
            return;
        }

        // Update the task
        tasks[taskIndex] = { ...tasks[taskIndex], ...updates };

        // Save tasks to localStorage
        await saveTasks();

        // Render the updated task list
        renderTasks();
    } catch (error) {
        console.error('Error updating task:', error);
        alert('An error occurred while updating the task. Please try again.');
    }
};

// Function to toggle task completion status
const toggleTaskCompletion = async (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (!task) {
        alert('Task not found!');
        return;
    }

    // Toggle the completion status
    task.completed = !task.completed;

    // Save tasks to localStorage
    await saveTasks();

    // Render the updated task list
    renderTasks();
};

// Function to save tasks to localStorage
const saveTasks = async () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to load tasks from localStorage
const loadTasks = () => {
    try {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        }
        renderTasks();
    } catch (error) {
        console.error('Error loading tasks:', error);
        alert('An error occurred while loading tasks. Please refresh the page.');
    }
};

// Function to filter and sort tasks
const filterAndSortTasks = () => {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filterPriority = document.getElementById('filterPriority').value;
    const sortBy = document.getElementById('sortBy').value;

    let filteredTasks = [...tasks];

    // Apply search
    if (searchTerm) {
        filteredTasks = filteredTasks.filter(task =>
            task.title.toLowerCase().includes(searchTerm) ||
            task.description.toLowerCase().includes(searchTerm)
        );
    }

    // Apply priority filter
    if (filterPriority !== 'all') {
        filteredTasks = filteredTasks.filter(task => task.priority === filterPriority);
    }

    // Apply sorting
    filteredTasks.sort((a, b) => {
        switch (sortBy) {
            case 'date':
                return new Date(a.dueDate) - new Date(b.dueDate);
            case 'priority':
                const priorityOrder = { high: 1, medium: 2, low: 3 };
                return priorityOrder[a.priority] - priorityOrder[b.priority];
            case 'title':
                return a.title.localeCompare(b.title);
            default:
                return 0;
        }
    });

    return filteredTasks;
};

// Function to render tasks in the DOM
const renderTasks = () => {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const filteredTasks = filterAndSortTasks();

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('div');
        taskItem.className = `task-item ${task.completed ? 'task-completed' : ''}`;
        taskItem.innerHTML = `
            <div>
                <h3>${task.title}</h3>
                <p>${task.description}</p>
                <span>Priority: ${task.priority}</span>
                <span>Due: ${new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
            <div class="task-actions">
                <button class="edit-btn" onclick="startEditing('${task.id}')">Edit</button>
                <button class="complete-btn" onclick="toggleTaskCompletion('${task.id}')">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>
                <button class="delete-btn" onclick="deleteTask('${task.id}')">Delete</button>
            </div>
        `;
        taskList.appendChild(taskItem);
    });
};

// Function to start editing a task
const startEditing = (taskId) => {
    const task = tasks.find(task => task.id === taskId);
    if (!task) return;

    // Populate the form with task details
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('taskPriority').value = task.priority;
    document.getElementById('taskDueDate').value = task.dueDate;

    // Change form submit button to update
    const submitButton = document.getElementById('taskForm').querySelector('button[type="submit"]');
    submitButton.textContent = 'Update Task';
    
    // Store the task ID being edited
    document.getElementById('taskForm').dataset.editingTaskId = taskId;
};

// Add event listeners for search and filters
document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
    
    // Add event listeners for search and filters
    document.getElementById('searchInput').addEventListener('input', renderTasks);
    document.getElementById('filterPriority').addEventListener('change', renderTasks);
    document.getElementById('sortBy').addEventListener('change', renderTasks);
});

// Update the form submission handler to handle both add and update
document.getElementById('taskForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const title = document.getElementById('taskTitle').value;
    const description = document.getElementById('taskDescription').value;
    const priority = document.getElementById('taskPriority').value;
    const dueDate = document.getElementById('taskDueDate').value;

    const editingTaskId = e.target.dataset.editingTaskId;

    if (editingTaskId) {
        // Update existing task
        await updateTask(editingTaskId, {
            title,
            description,
            priority,
            dueDate
        });
        
        // Reset form to add mode
        e.target.dataset.editingTaskId = '';
        e.target.querySelector('button[type="submit"]').textContent = 'Add Task';
    } else {
        // Add new task
        await addTask(title, description, priority, dueDate);
    }

    // Clear the form inputs
    document.getElementById('taskTitle').value = '';
    document.getElementById('taskDescription').value = '';
    document.getElementById('taskPriority').value = 'low';
    document.getElementById('taskDueDate').value = '';
});