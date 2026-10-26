const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incomplete-tasks');
const completedList = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  const idCheckbox = 'task-checkbox-' + Date.now();

  label.innerText = taskString;
  label.className = 'task';
  label.htmlFor = idCheckbox;

  checkbox.type = 'checkbox';
  checkbox.id = idCheckbox;

  editInput.type = 'text';
  editInput.className = 'task';
  editInput.name = 'edit-task';
  editInput.setAttribute('aria-label', 'Edit task text');
  editInput.title = 'Edit task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  editButton.type = 'button';

  deleteButton.className = 'delete';
  deleteButton.type = 'button';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  todoList.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');

  // switch of edit mode
  if (listItem.classList.contains('editMode')) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const toggleTask = function () {
  const targetList = this.checked ? completedList : todoList;
  targetList.appendChild(this.parentNode);
};

const bindTaskEvents = function (taskListItem) {
  const checkbox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = toggleTask;
};

const initializeTaskList = function (list) {
  for (let i = 0; i < list.children.length; i++) {
    bindTaskEvents(list.children[i]);
  }
};

addButton.addEventListener('click', addTask);
initializeTaskList(todoList);
initializeTaskList(completedList);
