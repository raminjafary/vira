import { HTMLElementSSR } from "./index.ts";

export class DocumentSSR {
  body: HTMLElementSSR;
  head: HTMLElementSSR;

  constructor() {
    this.body = this.createElement("body");
    this.head = this.createElement("head");
  }

  createElement(tag: string) {
    return new HTMLElementSSR(tag);
  }

  createElementNS(_URI: string, tag: string) {
    return new HTMLElementSSR(tag);
  }

  createTextNode(text: string) {
    return text;
  }

  querySelector(_query: any) {
    return undefined;
  }
}
