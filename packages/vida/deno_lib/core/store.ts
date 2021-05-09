export class Store {
  private _state: any;
  private _prevState: any;
  private _listeners: Map<string, Function> = new Map();
  private _storage: "memory" | "local" | "session";
  private _id: string;

  constructor(
    defaultState: any,
    name: string = "",
    storage: "memory" | "local" | "session" = "memory",
  ) {
    if (isSSR) {
      storage = "memory";
    }

    this._id = name;
    this._storage = storage;

    this._state = this._prevState = defaultState;

    if (!this._storage || this._storage === "memory") {
      return;
    }

    const Storage = storage === "local" ? localStorage : sessionStorage;

    const item = Storage.getItem(this._id);
    if (item) {
      this._state = this._prevState = JSON.parse(item);
    } else {
      Storage.setItem(this._id, JSON.stringify(defaultState));
    }
  }

  private persist(state: any) {
    if (this._storage === "memory") {
      return;
    }
    const Storage = this._storage === "local" ? localStorage : sessionStorage;
    Storage.setItem(this._id, JSON.stringify(state));
  }

  public clear() {
    this._state = this._prevState = undefined;
    const Storage = this._storage === "local" ? localStorage : sessionStorage;
    Storage.removeItem(this._id);
  }

  public set state(state: any) {
    this._prevState = this._state;
    this._state = state;

    this.persist(state);

    this._listeners.forEach((func) => {
      func(this._state, this._prevState);
    });
  }

  public get state() {
    return this._state;
  }

  public setState(state: any) {
    this.state = state;
  }

  public use() {
    const id = Math.random().toString(36).substr(2, 9);
    const _this = this;
    return {
      get state() {
        return _this.state;
      },
      setState(state: any) {
        _this.setState(state);
      },
      subscribe(func: (newState: any, prevState: any) => void) {
        _this._listeners.set(id, func);
      },
      cancel() {
        _this._listeners.delete(id);
      },
    };
  }
}
