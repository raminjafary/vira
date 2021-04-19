import * as Vida from "vida";

export default () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Vida.Link prefetch="hover" href="/about">
        About
      </Vida.Link>
      <hr />
      <Vida.Link prefetch href="/todos">
        Todos
      </Vida.Link>
    </div>
  );
};
