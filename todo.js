const todoInput = document.querySelector(".js-todoInput");
const todoList = document.querySelector(".js-todoList");

let todos = [];
let id = 1;

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
  const loadedTodos = localStorage.getItem("todos");
  if (loadedTodos !== null) {
    todos = JSON.parse(loadedTodos);
    printTodos();
  }
};

const addTodos = () => {
  const value = todoInput.value;
  todos.push({ id, value });
  saveTodos(todos);
  printTodos();
  todoInput.value = "";
  id++;
};

const delTodos = (e) => {
  const li = e.target.parentNode;
  li.remove();
  const updatedTodos = todos.filter((todo) => todo.id !== parseInt(li.id));
  todos = updatedTodos;
  saveTodos(todos);
};

const printTodos = () => {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todolist");
    li.id = todo.id;
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    const delBtn = document.createElement("button");
    delBtn.classList.add("delBtn");
    delBtn.addEventListener("click", delTodos);
    delBtn.innerText = "🗑️";

    li.textContent = todo.value;
    li.prepend(checkbox);
    li.appendChild(delBtn);
    todoList.appendChild(li);

    checkboxEvent(checkbox, li);
  });
};

const checkboxEvent = (checkbox, li) => {
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      li.style.textDecoration = "line-through";
      li.style.color = "grey";
    } else {
      li.style.textDecoration = "";
      li.style.color = "";
    }
  });
};

const addEvent = () => {
  todoInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      addTodos();
    }
  });
};
const init = () => {
  loadTodos();
  addEvent();
};
init();
