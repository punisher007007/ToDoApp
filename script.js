// script.js - JavaScript functionality for the Todo App

// Get references to HTML elements
const todoForm = document.getElementById('todo-form'); // The form for adding todos
const todoInput = document.getElementById('todo-input'); // The input field for new todo text
const todoList = document.getElementById('todo-list'); // The list where todos are displayed

// Array to store todos (will be loaded from localStorage)
let todos = [];

// Load todos from localStorage when the page loads
document.addEventListener('DOMContentLoaded', loadTodos);

// Function to load todos from localStorage
function loadTodos() {
    // Get todos from localStorage, or empty array if none
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos); // Parse the JSON string back to array
        renderTodos(); // Display the loaded todos
    }
}

// Function to save todos to localStorage
function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos)); // Convert array to JSON string
}

// Function to render (display) all todos in the list
function renderTodos() {
    todoList.innerHTML = ''; // Clear the current list
    todos.forEach((todo, index) => { // Loop through each todo
        const li = document.createElement('li'); // Create a list item
        li.className = 'todo-item'; // Add CSS class
        if (todo.completed) {
            li.classList.add('completed'); // Add completed class if done
        }

        // Create checkbox for marking as complete
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = todo.completed; // Set checked state
        checkbox.addEventListener('change', () => toggleComplete(index)); // Toggle on change

        // Create span for todo text
        const span = document.createElement('span');
        span.className = 'todo-text';
        span.textContent = todo.text; // Set the text

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(index)); // Delete on click

        // Append elements to the list item
        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);

        // Append list item to the todo list
        todoList.appendChild(li);
    });
}

// Function to add a new todo
function addTodo(text) {
    const newTodo = {
        text: text, // The text of the todo
        completed: false // Initially not completed
    };
    todos.push(newTodo); // Add to the todos array
    saveTodos(); // Save to localStorage
    renderTodos(); // Re-render the list
}

// Function to toggle the completed status of a todo
function toggleComplete(index) {
    todos[index].completed = !todos[index].completed; // Flip the completed flag
    saveTodos(); // Save changes
    renderTodos(); // Re-render
}

// Function to delete a todo
function deleteTodo(index) {
    todos.splice(index, 1); // Remove from array
    saveTodos(); // Save changes
    renderTodos(); // Re-render
}

// Event listener for form submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload
    const text = todoInput.value.trim(); // Get input value and trim whitespace
    if (text) { // If there's text
        addTodo(text); // Add the todo
        todoInput.value = ''; // Clear the input
    }
});