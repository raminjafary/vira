import * as Vida from "vida";
import TodoList from "../components/todoList";

export default class Todos extends Vida.Component {
  static fetchTodos() {}

  render() {
    return (
      <div id="todos">
        <h2>Todos</h2>
        <Vida.Suspense
          names={Todos.fetchTodos}
          fallback={<div>loading...</div>}
        >
          <TodoList />
        </Vida.Suspense>
        <script async src="/public/js/todos.hydrate.js"></script>
      </div>
    );
  }
}
