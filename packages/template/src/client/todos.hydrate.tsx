import * as Vida from "vida";
import Todo from "../pages/todos";
// import TodoList from "../components/todoList";

Vida.hydrate(<Todo />, document.getElementById("todos"));
