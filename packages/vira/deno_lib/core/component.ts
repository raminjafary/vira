import { nextTick, onNodeRemove } from "../utils.ts";
import { renderElement, _state } from "./index.ts";

export class Component<P extends Object = any, S = any> {
  public id: string | number;
  private _skipUnmout: boolean;
  private _hasUnmounted: boolean;
  private _elements: HTMLElement[] = [];

  constructor(public props: P) {
    this.id = this._getHash();
  }

  public render(_update?: any) {}
  public mount() {}
  public beforeMount() {}
  public destroy() {}
  private _getHash(): any {}

  setState(state: S, shouldUpdate: boolean = false) {
    if (state && typeof state === "object") {
      this.state = { ...this.state, ...state };
    } else this.state = state;

    if (shouldUpdate) this.update();
  }

  get state() {
    return _state.get(this.id);
  }

  set state(value: S) {
    _state.set(this.id, value);
  }

  set initialState(state: S) {
    if (!this.state) this.state = state;
  }

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
    this.elements = el as unknown as HTMLElement[];

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

    //@ts-ignore
    nextTick(() => {
      this._skipUnmout = false;
      if (!this.elements[0].isConnected) {
        this._destory();
      }
    });
  }
}
