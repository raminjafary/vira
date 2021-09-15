import { h } from "../core/index.ts";
import htm from "./htm.ts";
export default htm;

export const jsx = htm.bind(h);
