import * as Vida from "vida";

export default (props: any) => {
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
