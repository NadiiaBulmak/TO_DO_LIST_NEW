'use strict';

// Получаем элементы из DOM
const inputBox = document.getElementById('input-box');
const listContainer = document.getElementById('list-container');
const addButton = document.querySelector('.todo-app__button');

// Загружаем сохранённые задачи при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  loadData();
});

// Добавляем обработчик событий на кнопку "Добавить"
addButton.addEventListener('click', addTask);

// Функция для добавления задачи
function addTask() {
  if (inputBox.value.trim() === '') {
    window.alert('You have to write something!');
  }

  const li = createTaskElement(inputBox.value);

  listContainer.appendChild(li);
  inputBox.value = '';
  saveData();
}

// Функция для создания DOM-элемента задачи
function createTaskElement(taskText, checked = false) {
  const li = document.createElement('li');

  li.classList.add('todo-app__item');
  li.textContent = taskText;

  if (checked) {
    li.classList.add('todo-app__item--checked');
  }

  const span = document.createElement('span');

  span.innerHTML = '\u00d7'; // Символ крестика
  span.classList.add('todo-app__item-remove');
  li.appendChild(span);

  // Добавляем обработчики событий
  li.addEventListener('click', () => {
    li.classList.toggle('todo-app__item--checked');
    saveData();
  });

  span.addEventListener('click', (event) => {
    event.stopPropagation(); // Предотвращаем срабатывание клика на li
    li.remove();
    saveData();
  });

  return li;
}

// Функция для сохранения данных в localStorage
function saveData() {
  const tasks = [];

  listContainer.querySelectorAll('.todo-app__item').forEach((item) => {
    tasks.push({
      text: item.textContent.slice(0, -1), // Убираем крестик
      checked: item.classList.contains('todo-app__item--checked'),
    });
  });

  window.localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для загрузки данных из localStorage
function loadData() {
  const savedData = JSON.parse(window.localStorage.getItem('tasks')) || [];

  listContainer.innerHTML = ''; // Очищаем список перед загрузкой

  savedData.forEach((task) => {
    const li = createTaskElement(task.text, task.checked);

    listContainer.appendChild(li);
  });
}
