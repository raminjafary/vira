import Vira, { ViraLink, Link } from "vira";

export default () => {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/* <Vira.Link prefetch="hover" href="/about">
        About
      </Vira.Link> */}
      <ViraLink to="/about">About</ViraLink>
      <ViraLink to="/deadend">Deadend</ViraLink>
      <Link prefetch href="/todos">
        Todos prefetched SSR
      </Link>
    </div>
  );
};
