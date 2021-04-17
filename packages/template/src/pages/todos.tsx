import * as Vida from "vida";
import TodoList from "../components/todoList";

const fetchTodos = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const json = await res.json();
  const names = json.map((obj: any) => obj.name);
  return names;
};

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
          names={Todos.fetchTodos() || fetchTodos}
          fallback={<div>loading...</div>}
        >
          <TodoList />
        </Vida.Suspense>
        <Vida.Helmet footer>
          <script async src="/public/js/todos.hydrate.js"></script>
        </Vida.Helmet>
      </div>
    );
  }
}
