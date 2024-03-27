const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Todo = require("./models/todo")

const port = 3000

app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const dburl = "mongodb+srv://lee-vartha:hyp1ricuMLeuc5thoe@tododb.yufz5sh.mongodb.net/"
mongoose.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true })

app.get("/", (request, response) => {
    Todo.find()
    .then(result => {
        response.render("index", { data: result})
        console.log(result)
    })
})

app.post("/", (request, response) => {
    const todo = new Todo({
        todo: request.body.todoValue
    })
    todo.save()
    
    .then(result => {
        // once user submits it, it sends it to db and they go back to the homepage
        response.redirect("/")
    })
})


app.delete("/:id", (request, response) => {
    Todo.findByIdAndDelete(request.params.id)
    .then(result => {
        response.json({ redirect: "/"})
    })
})



// Update route for todo item
app.patch("/:id", (request, response) => {
    const todoId = request.params.id;
    const updatedTodo = request.body.todoValue; // Assuming the updated todo value is sent in the request body
  
    Todo.findByIdAndUpdate(todoId, { todo: updatedTodo }, { new: true })
      .then((result) => {
        response.json(result);
      })
      .catch((error) => {
        console.error('Error updating todo:', error);
        response.status(500).json({ error: 'Failed to update todo item' });
      });
});




app.listen(port, () => {
    console.log("")
    console.log(`Server is running on port ${port}`)
})