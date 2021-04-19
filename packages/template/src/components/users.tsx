import * as Vida from "vida";
import classNames from "./users.client.module.css";
import "./users.client.scss";

const fetchNames = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const json = await res.json();
  const names = json.map((obj: any) => obj.name);
  return names;
};

const List = (props: any) => {
  return (
    <ul>
      {props.names
        ? props.names.map((n: any) => {
            return <li>{n}</li>;
          })
        : ""}
    </ul>
  );
};

export default function Users() {
  return (
    <div style={{ marginTop: "50px;" }}>
      <h2 class={classNames["users"]}>Users: </h2>
      <Vida.Suspense cache names={fetchNames} fallback={<div>loading...</div>}>
        <List />
      </Vida.Suspense>
    </div>
  );
}
