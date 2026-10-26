const taskInput = document.getElementById('new-task');
const addButton = document.getElementsByTagName('button')[0];
const incompleteTaskHolder = document.getElementById('incomplete-tasks');
const completedTasksHolder = document.getElementById('completed-tasks');

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  const idCheckBox = 'task-checkbox-' + Date.now();

  label.innerText = taskString;
  label.className = 'task';
  label.htmlFor = idCheckBox;

  checkBox.type = 'checkbox';
  checkBox.id = idCheckBox;

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

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);

  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editBtn = listItem.querySelector('.edit');

  // switch of edit mode
  if (listItem.classList.contains('editMode')) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;

  ul.removeChild(listItem);
};

const toggleTask = function () {
  const targetList = this.checked ? completedTasksHolder : incompleteTaskHolder;
  targetList.appendChild(this.parentNode);
};

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleTask;
};

const initializeTaskList = function (list) {
  for (let i = 0; i < list.children.length; i++) {
    bindTaskEvents(list.children[i]);
  }
};

addButton.addEventListener('click', addTask);
initializeTaskList(incompleteTaskHolder);
initializeTaskList(completedTasksHolder);
