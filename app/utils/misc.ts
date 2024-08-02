import _ from "underscore";
import dayjs from "dayjs";

/**
 * 用作渲染记录Bug信息
 * */

export const renderLog = (() => {
  const count: number = 0;
  const cache = new Map<string, number>();
  return (namespace: string) => {
    const pre = cache.get(namespace) ?? 0;
    console.log(`[${namespace}]-`, "Render Count: ", pre + 1);
    cache.set(namespace, (pre ?? 0) + 1);
  };
})();

export function extraFunction<T>(fnLike: any, ...args: any[]) {
  return _.isFunction(fnLike) ? fnLike(...args) : fnLike;
}

// export const useResizeObserve = (() => {
//     const cached = new WeakMap();
//     const resizeObserver = new ResizeObserver((entries) => {
//         for (const entry of entries) {
//             if (entry.contentBoxSize) {
//                 // Firefox implements `contentBoxSize` as a single content rect, rather than an array
//                 cached.get(entry.target)?.();
//             }
//         }
//     });
//     const observe = (el: HTMLElement, fn?: Function) => {
//         cached.set(el, fn ?? noop);
//         return resizeObserver.observe(el);
//     };
//
//     const unobserve = (el: HTMLElement) => resizeObserver.unobserve(el);
//     return {
//         observe,
//         unobserve
//     };
// })();

export function camelCase(str: string) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ""));
}

export function toCamelCase(str: string) {
  return str.substring(0, 1).toUpperCase() + str.substring(1, str.length);
}

export function isDev() {
  return (
    (process.env.NODE_ENV as "development" | "production") === "development"
  );
}

export function obj2form(obj: Record<string, any>) {
  const data = new FormData();
  Object.keys(obj).forEach((key) => {
    data.set(key, obj[key]);
  });
  return data;
}

export const formatTime = (time: string) => {
  try {
    return dayjs(time).format("YYYY-MM-DD hh:mm") || time;
  } catch {
    return time;
  }
};

export const placeholder = (
  text: string | undefined,
  placeholder_text: string = "暂无信息",
  type: "text" = "text"
) => {
  if (!text) {
    return placeholder_text;
  }
  return text;
};
export const assert = (
  condition: boolean,
  whenTrue: unknown,
  whenFalse: unknown
) => {
  return condition ? whenTrue : whenFalse;
};
export const isHref = (url: string) => /(http)|(https)|(ws)|(wss)/.test(url);

type Locker = {
  state: boolean;
  lock: () => boolean;
  unlock: () => boolean;
};
type InferWithoutLocker<T extends (locker: Locker, ...args: any[]) => any> =
  T extends (locker: Locker, ...args: (infer P)[]) => ReturnType<T>
    ? P
    : Parameters<T>;

export function withLocker<T extends (locker: Locker, ...args: any[]) => any>(
  fn: T
) {
  let _locked = false;

  function lock() {
    _locked = true;
    return true;
  }

  function unlock() {
    _locked = false;
    return false;
  }

  return async function (...args: InferWithoutLocker<T>[]) {
    try {
      if (_locked) return;
      return await fn(
        {
          state: _locked,
          lock,
          unlock
        },
        ...args
      );
    } catch (e) {
      unlock();
      return Promise.reject(e);
    }
  };
}

export const delayWithClean = (fn: Function, delay: number) => {
  const timer = setTimeout(() => {
    return fn();
  }, delay);
  return () => {
    clearTimeout(timer);
  };
};
