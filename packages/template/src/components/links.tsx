import Vida, { VidaLink, Link } from "vida";

export default () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <Vida.Link prefetch="hover" href="/about">
        About
      </Vida.Link> */}
      <VidaLink to="/about">About</VidaLink>
      <hr />
      <Link prefetch href="/todos">
        Todos
      </Link>
    </div>
  );
};
