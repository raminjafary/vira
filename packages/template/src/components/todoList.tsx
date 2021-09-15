import Vira, { withStyles } from "vira";
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

export default withStyles(styles)(Todos);
