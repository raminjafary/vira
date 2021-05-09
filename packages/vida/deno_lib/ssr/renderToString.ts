import { DocumentSSR } from "./index.ts";
import { render, _state } from "../core/index.ts";
import { detectSSR } from "../utils.ts";

globalThis.isSSR = detectSSR() === true ? true : undefined;
globalThis._nano = { isSSR, location: { pathname: "/" } };

export function initSSR(pathname: string = "/") {
  _nano.location = { pathname };
  // @ts-ignore
  globalThis.document = isSSR ? new DocumentSSR() : window.document;
}

export function renderToString(
  component: any,
  options: { pathname?: string; clearState?: boolean } = {},
) {
  const { pathname, clearState = true } = options;

  initSSR(pathname);
  if (clearState) _state.clear();

  return render(component, null, true).join("") as string;
}
