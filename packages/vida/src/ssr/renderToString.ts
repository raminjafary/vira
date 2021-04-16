import { render } from "../core";
import { detectSSR } from "../utils";

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
  initSSR(options?.pathname);

  return render(component, null, true).join("") as string;
}

export class HTMLElementSSR {
  ssr: string;
  selfClosing: boolean;
  tagName: string;

  constructor(tag: string) {
    this.tagName = tag;
    const selfClosing = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ];

    if (selfClosing.indexOf(tag) >= 0) {
      this.ssr = `<${tag} />`;
      this.selfClosing = true;
    } else {
      this.ssr = `<${tag}></${tag}>`;
    }
  }

  get outerHTML() {
    return this.innerText;
  }

  get innerHTML() {
    const reg = /(^<[a-z]+>)([\s\S]*)(<\/[a-z]+>$)/gm;
    return reg.exec(this.ssr)?.[2] ?? "";
  }

  get innerText() {
    const reg = /(^<[^>]+>)(.+)?(<\/[a-z]+>$|\/>$)/gm;
    return reg.exec(this.ssr)?.[2] ?? "";
  }

  set innerText(text) {
    const reg = /(^<[^>]+>)(.+)?(<\/[a-z]+>$|\/>$)/gm;
    this.ssr = this.ssr.replace(reg, `$1${text}$3`);
  }

  get attributes() {
    return { length: 1 };
  }

  get children() {
    const reg = /<([a-z]+)((?!<\/\1).)*<\/\1>/gms;

    const array = [];

    let match;

    while ((match = reg.exec(this.innerHTML)) !== null) {
      array.push(match[0].replace(/[\s]+/gm, " "));
    }

    return array;
  }
  setAttributeNS(name: string, value: any) {
    this.setAttribute(name, value);
  }

  setAttribute(name: string, value: any) {
    if (this.selfClosing)
      this.ssr = this.ssr.replace(
        /(^<[a-z]+ )(.+)/gm,
        `$1${name}="${value}" $2`,
      );
    else
      this.ssr = this.ssr.replace(/(^<[^>]+)(.+)/gm, `$1 ${name}="${value}"$2`);
  }

  appendChild(child: any) {
    const append = child.ssr ? child.ssr : child;

    const index = this.ssr.lastIndexOf("</");

    this.ssr =
      this.ssr.substring(0, index) + append + this.ssr.substring(index);
  }

  replaceChild(newChild: any, _oldChild?: any) {
    this.innerText = newChild.ssr;
  }

  addEventListener(_type: any, _listener: any, _options?: any) {}
}

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
