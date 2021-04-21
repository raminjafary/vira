import * as Vida from "vida";

export default () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <Vida.Link prefetch="hover" href="/about">
        About
      </Vida.Link> */}
      <Vida.Router.Link to="/about">About</Vida.Router.Link>
      <hr />
      <Vida.Link prefetch href="/todos">
        Todos
      </Vida.Link>
    </div>
  );
};
