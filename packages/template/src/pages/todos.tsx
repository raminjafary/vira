import * as Vida from "vida";
import TodoList from "../components/todoList";
export default class Todos extends Vida.Component {
  static fetchTodos(): any {}

  render() {
    return (
      <div>
        <Vida.Helmet>
          <title>todos</title>
        </Vida.Helmet>
        <h2>Todos</h2>
        <Vida.Suspense
          names={Todos.fetchTodos()}
          fallback={<div>loading...</div>}
        >
          <TodoList />
        </Vida.Suspense>
      </div>
    );
  }
}
