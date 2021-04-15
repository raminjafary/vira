import { nextTick, onNodeRemove } from "../utils";
import { renderElement } from "./renderElement";

export class Component {
  public id: string;
  private _skipUnmout: boolean;
  private _hasUnmounted: boolean;
  private _elements: HTMLElement[] = [];

  constructor(public props: any) {
    this.id = this._getHash();
  }

  public render(_update?: any) {}
  public mount() {}
  public beforeMount() {}
  public destroy() {}
  private _getHash(): any {}

  public get elements() {
    return this._elements;
  }

  public set elements(elements: HTMLElement[]) {
    if (!Array.isArray(elements)) {
      elements = [elements];
    }

    for (const el of elements) {
      this._elements.push(el);
    }
  }

  private addNodeRemoveListener() {
    if (/^[^{]+{\s+}$/gm.test(this.destroy.toString())) return;

    onNodeRemove(this.elements[0], () => {
      if (!this._skipUnmout) {
        this.destroy();
      }
    });
  }

  //@ts-ignore
  private _mount() {
    this.addNodeRemoveListener();
    this.mount();
  }

  private _destory() {
    if (this._hasUnmounted) return;
    this.destroy();
    this._hasUnmounted = true;
  }

  public update(update?: any) {
    this._skipUnmout = true;

    const oldElements = [...this.elements];

    this._elements = [];

    let el = this.render(update);
    el = renderElement(el);
    this.elements = (el as unknown) as HTMLElement[];

    const parent = oldElements[0].parentElement as HTMLElement;

    if (!parent)
      console.warn("Component needs a parent element to get updated!");

    for (const child of this.elements) {
      parent.insertBefore(child, oldElements[0]);
    }

    for (let child of oldElements) {
      child.remove();
      //@ts-ignore
      child = null;
    }

    this.addNodeRemoveListener();

    nextTick(() => {
      this._skipUnmout = false;
      if (!this.elements[0].isConnected) {
        this._destory();
      }
    });
  }
}
