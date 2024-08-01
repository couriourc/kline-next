type DefaultFn = (...args: any[]) => any;

export function withKey<T extends DefaultFn>(fn: T, key: KeyboardEvent["key"]) {
  return (...args: Parameters<T>) => {
    const ev = args[0] as KeyboardEvent;
    if (ev && ev.key.toUpperCase() === key.toUpperCase()) {
      return fn(...args);
    }
    return;
  };
}

export function withEnter<T extends DefaultFn>(fn: T) {
  return withKey(fn, "enter");
}

export function withAction<T extends DefaultFn>(
  fn: T,
  key: "stopPropagation" | "stopImmediatePropagation" | "preventDefault"
) {
  return (...args: Parameters<T>) => {
    const ev = args[0] as MouseEvent;
    ev[key]();
    return fn(...args);
  };
}

export function withStop<T extends DefaultFn>(fn: T) {
  return withAction(fn, "stopPropagation");
}

export function withPrevent<T extends DefaultFn>(fn: T) {
  return withAction(fn, "preventDefault");
}
