const taskInput = document.getElementById('taskInput');
const categorySelect = document.getElementById('categorySelect');
const prioritySelect = document.getElementById('prioritySelect');
const dueDateInput = document.getElementById('dueDateInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.querySelector('.task-list');

let tasks = [];

addTaskButton.addEventListener('click', () => {
    const taskDescription = taskInput.value.trim();
    const category = categorySelect.value;
    const priority = prioritySelect.value;
    const dueDate = dueDateInput.value;

    if (!taskDescription) {
        alert('Please enter a task description.');
        return;
    }

    const task = {
        id: tasks.length + 1,
        description: taskDescription,
        category: category,
        priority: priority,
        dueDate: dueDate,
        status: 'to do',
    };

    tasks.push(task);
    renderTaskList();

    taskInput.value = '';
    categorySelect.value = '';
    prioritySelect.value = '';
    dueDateInput.value = '';
});

function renderTaskList() {
    taskList.innerHTML = '';

    for (const task of tasks) {
        const taskItem = createTaskItem(task);
        taskList.appendChild(taskItem);
    }
}

function createTaskItem(task) {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task-item');

    const taskDescriptionElement = document.createElement('p');
    taskDescriptionElement.classList.add('task-description');
    taskDescriptionElement.textContent = task.description;

    const taskDetailsElement = document.createElement('p');
    taskDetailsElement.classList.add('task-details');
    taskDetailsElement.textContent = `Category: ${task.category} | Priority: ${task.priority} | Due Date: ${task.dueDate} | Status: ${task.status}`;

    const taskButtonsElement = document.createElement('div');
    taskButtonsElement.classList.add('task-buttons');

    const editButton = document.createElement('button');
    editButton.classList.add('edit-button');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', () => {
        editTask(task.id);
    });

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        deleteTask(task.id);
    });

    taskButtonsElement.appendChild(editButton);
    taskButtonsElement.appendChild(deleteButton);

    taskElement.appendChild(taskDescriptionElement);
    taskElement.appendChild(taskDetailsElement);
    taskElement.appendChild(taskButtonsElement);

    return taskElement;
}

function editTask(taskId) {
    const taskToEdit = tasks.find((task) => task.id === taskId);
    const taskItem = document.querySelector(`.task-item[data-task-id="${taskId}"]`);

    const taskDescriptionInput = document.getElementById('taskDescriptionInput');
    taskDescriptionInput.id = `taskDescriptionInput-${taskId}`;
    taskDescriptionInput.value = taskToEdit.description;

    const taskCategorySelect = document.getElementById('taskCategorySelect');
    taskCategorySelect.id = `taskCategorySelect-${taskId}`;
    taskCategorySelect.value = taskToEdit.category;

    const taskPrioritySelect = document.getElementById('taskPrioritySelect');
    taskPrioritySelect.id = `taskPrioritySelect-${taskId}`;
    taskPrioritySelect.value = taskToEdit.priority;

    const taskDueDateInput = document.getElementById('taskDueDateInput');
    taskDueDateInput.id = `taskDueDateInput-${taskId}`;
    taskDueDateInput.value = taskToEdit.dueDate;

    const updateTaskButton = document.getElementById('updateTaskButton');
    updateTaskButton.addEventListener('click', () => {
        const updatedTaskDescription = taskDescriptionInput.value.trim();
        const updatedTaskCategory = taskCategorySelect.value;
        const updatedTaskPriority = taskPrioritySelect.value;
        const updatedTaskDueDate = taskDueDateInput.value;

        if (!updatedTaskDescription) {
            alert('Please enter a task description.');
            return;
        }

        taskToEdit.description = updatedTaskDescription;
        taskToEdit.category = updatedTaskCategory;
        taskToEdit.priority = updatedTaskPriority;
        taskToEdit.dueDate = updatedTaskDueDate;

        // Reset edit form fields
    taskDescriptionInput.value = '';
    taskCategorySelect.value = '';
    taskPrioritySelect.value = '';
    taskDueDateInput.value = '';

        renderTaskList();
        closeEditForm();
    });

    const cancelButton = document.getElementById('cancelButton');
    cancelButton.addEventListener('click', () => {
        closeEditForm();
    });

    const editForm = document.querySelector('.edit-form');
    editForm.style.display = 'block';

    taskItem.replaceWith(editForm);
}


function deleteTask(taskId) {
    tasks = tasks.filter((task) => task.id !== taskId);
    renderTaskList();
}


const sortByPriorityButton = document.getElementById('sortByPriorityButton');
const sortSelect = document.getElementById('sortSelect');

sortByPriorityButton.addEventListener('click', () => {
    const selectedOption = sortSelect.value;

    if (selectedOption === 'high') {
        tasks.sort((a, b) => b.priority - a.priority);
    } else if (selectedOption === 'low') {
        tasks.sort((a, b) => a.priority - b.priority);
    }

    renderTaskList();
});