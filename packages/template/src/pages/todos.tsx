import Vira, { Helmet, Suspense, Component } from "vira";
import TodoList from "../components/todoList";
export default class Todos extends Component {
  static fetchTodos(): any {}

  render() {
    return (
      <div>
        <Helmet>
          <title>todos</title>
        </Helmet>
        <h2>Todos</h2>
        <Suspense names={Todos.fetchTodos()} fallback={<div>loading...</div>}>
          <TodoList />
        </Suspense>
      </div>
    );
  }
}
