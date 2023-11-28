const inputBox = document.getElementById('inputBox');
const addBtn = document.getElementById('addBtn');
const todoList = document.getElementById('todoList');

let editTodo = null;

const addTodo = () => {
   const inputText = inputBox.value.trim();
   if (inputText.length <= 0) {
      alert("Please add a new ToDo...");
      return false;
   }

   if (addBtn.value === "Edit") {
      editLocalTodos(editTodo.target.parentElement);
      editTodo.target.previousElementSibling.innerText = inputText;
      addBtn.value = "Add";
      inputBox.value = '';
      editTodo.target.parentElement.classList.remove('pointer');
      todoList.style.pointerEvents = "auto";
   }

   else {

      // creating p and li tag
      const li = document.createElement("li");
      const p = document.createElement("p");
      p.innerText = inputText;
      li.appendChild(p);

      // creating edit button
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit";
      editBtn.classList.add('btn', 'editBtn');
      li.appendChild(editBtn);

      // creating remove button
      const deleteBtn = document.createElement("button");
      deleteBtn.innerText = "Remove";
      deleteBtn.classList.add("btn", "deleteBtn");
      li.appendChild(deleteBtn);

      todoList.appendChild(li);
      inputBox.value = '';

      saveLocalTodos(inputText);
   }
}

const updateTodo = (e) => {
   if (e.target.innerText === "Remove") {
      todoList.removeChild(e.target.parentElement);
      deleteLocalTodos(e.target.parentElement);
   }

   if (e.target.innerText === "Edit") {
      inputBox.value = e.target.previousElementSibling.innerText;
      inputBox.focus();
      e.target.parentElement.classList.add('pointer');
      todoList.style.pointerEvents = "none";
      addBtn.value = "Edit";
      editTodo = e;
   }
}

// save local todos
const saveLocalTodos = (todo) => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }
   else {
      todos = JSON.parse(localStorage.getItem("todos"));
   }

   todos.push(todo);
   localStorage.setItem("todos", JSON.stringify(todos));
}

// get local todos to show on UI
const getLocalTodos = () => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }

   else {
      todos = JSON.parse(localStorage.getItem("todos"));
      todos.forEach(todo => {
         // creating p and li tag
         const li = document.createElement("li");
         const p = document.createElement("p");
         p.innerText = todo;
         li.appendChild(p);

         // creating edit button
         const editBtn = document.createElement("button");
         editBtn.innerText = "Edit";
         editBtn.classList.add('btn', 'editBtn');
         li.appendChild(editBtn);

         // creating remove button
         const deleteBtn = document.createElement("button");
         deleteBtn.innerText = "Remove";
         deleteBtn.classList.add("btn", "deleteBtn");
         li.appendChild(deleteBtn);

         todoList.appendChild(li);
      });
   }
}

// delete local todos
const deleteLocalTodos = (todo) => {
   let todos;
   if (localStorage.getItem("todos") === null) {
      todos = [];
   }

   else {
      todos = JSON.parse(localStorage.getItem("todos"));
      let todoText = todo.children[0].innerText;
      let todoIndex = todos.indexOf(todoText);
      todos.splice(todoIndex, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
   }

}

// edit local todos 
const editLocalTodos = (todo) => {
   let todos;
   todos = JSON.parse(localStorage.getItem("todos"));
   let todoText = todo.children[0].innerText;
   let todoIndex = todos.indexOf(todoText);
   todos[todoIndex] = inputBox.value.trim();
   localStorage.setItem("todos", JSON.stringify(todos));
}

document.addEventListener('DOMContentLoaded', getLocalTodos);
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', updateTodo);