import Vira, { ViraLink } from "vira";

export default ({ path }: { path: string }) => {
  return (
    <div>
      <h1>{path}</h1>
      <ViraLink to="/">Home</ViraLink>
      <br />
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium
        est, quas repudiandae id, tenetur nemo hic eius excepturi reiciendis
        praesentium ipsum! Quam possimus facilis hic officiis numquam ipsam
        adipisci aut!
      </p>
    </div>
  );
};
