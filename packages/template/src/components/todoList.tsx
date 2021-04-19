import * as Vida from "vida";
import styles from "./todos.scss";

const Todos = (props: any) => {
  return (
    <ul>
      {props.names
        ? props.names.map((n: any) => {
            return <li onClick={() => console.log("dfsdfsdf")}>{n}</li>;
          })
        : []}
    </ul>
  );
};

export default Vida.withStyles(styles)(Todos);
