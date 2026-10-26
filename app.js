const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const todoList = document.getElementById('incomplete-tasks');
const completedList = document.getElementById('completed-tasks');

const createCheckbox = function (id) {
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = id;
  return checkbox;
};

const createLabel = function (taskString, id) {
  const label = document.createElement('label');
  label.innerText = taskString;
  label.className = 'task';
  label.htmlFor = id;
  return label;
};

const createEditInput = function () {
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.className = 'task';
  editInput.name = 'edit-task';
  editInput.setAttribute('aria-label', 'Edit task text');
  editInput.title = 'Edit task';
  return editInput;
};

const createEditButton = function () {
  const editButton = document.createElement('button');
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  editButton.type = 'button';
  return editButton;
};

const createDeleteButton = function () {
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete';
  deleteButton.type = 'button';

  const deleteButtonImg = document.createElement('img');
  deleteButtonImg.src = './remove.svg';

  deleteButton.appendChild(deleteButtonImg);
  return deleteButton;
};

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const id = 'task-checkbox-' + Date.now();

  listItem.appendChild(createCheckbox(id));
  listItem.appendChild(createLabel(taskString, id));
  listItem.appendChild(createEditInput());
  listItem.appendChild(createEditButton());
  listItem.appendChild(createDeleteButton());

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
