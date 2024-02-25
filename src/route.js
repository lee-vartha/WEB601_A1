const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const todoFilePath = "./data/todo.json";


// read existing todos
function readTodos() {
    const todoData = fs.readFileSync(todoFilePath);
    return JSON.parse(todoData);
}

// write todos to file
function writeTodos(todo) {
    fs.writeFileSync(todoFilePath, JSON.stringify(todo, null, 2));
} 

// CREATE - add a new todo for the list using an html form
router.get('/todo/create', (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Create TODO</title>
    </head>
    <body>
      <h1>Create TODO</h1>
      <form action="/todos/create" method="post">
        <label for="title">Title:</label>
        <input type="text" id="title" name="title" required><br>

        <label for="priority">Priority:</label>
        <input type="text" id="priority" name="priority" required><br>

        <label for="category">Category:</label>
        <input type="text" id="category" name="category" required><br>

        <button type="submit">Create TODO</button>
      </form>
    </body>
    </html>
    `)
});

router.post('/todo/create', (req, res) => {
    const todo = readTodos();
    const { title, priority, category } = req.body;

    if (!title || !priority || !category) {
        return res.status(400).send("All fields here are required");
    }

    const newTodo = { id: todo.length + 1, title, priority, category };

    todo.push(newTodo);
    writeTodos(todo);

    res.redirect("/todo");
})


// read - viewing all the todos
router.get('/todo', (req, res) => {
    const todo = readTodos();
    res.send(todo);
});

router.put('/todo/update/:id', (req, res) => {
    const todo = readTodos();
    const todoId = parseInt(req.params.id);
    const updatedTodo = req.body;

    const index = todo.findIndex(todo => todo.id === todoId);
    if (index === -1) {
        return res.status(404).send("Todo not found");
    } else {
        todo[index] = updatedTodo;
        writeTodos(todo);
        res.send(updatedTodo); // or is it res.json(todo[index])?? or // res.json(updatedTodo)???
    }
});

// delete - remove a todo from the list
router.delete('/todo/delete/:id', (req, res) => {
    const todo = readTodos();
    const todoId = parseInt(req.params.id);

    const index = todo.findIndex(todo => todo.id === todoId);
    if (index === -1) {
        return res.status(404).send("Todo not found");
    } else {
        const deletedTodo = todo.splice(index, 1)[0];
        writeTodos(todo);
        res.send(deletedTodo); // or is it res.json(deletedTodo)???
    }
})

module.exports = router;

