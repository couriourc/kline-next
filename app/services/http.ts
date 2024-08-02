import type { AxiosInstance, AxiosResponse } from "axios";
import axios, { type AxiosRequestConfig } from "axios";
import type {
  DynamicProps,
  FunctionOrValue,
  WithMessageProps
} from "@/app/types/misc";
import { isDev, isHref } from "@/app/utils/misc";
import { getConfigurationFromGlobal } from "@/app/utils/globalConfig";
import { delay, random } from "underscore";

interface AxiosRequestType extends AxiosRequestConfig {
  baseURL?: string;
  url?: string | undefined;
  data?: any;
  params?: any;
  method?: string;
  headers: any;
  value?: any;
  cancelToken?: any;
  load?: any;
  noLoad?: boolean;
  need_loading?: boolean;
  mock?: any;
}

// axios 配置
const request: AxiosInstance = axios.create({
  get baseURL() {
    return getConfigurationFromGlobal("base_url", "");
  }
});

request.interceptors.request.use(
  (config) => {
    if (config.params instanceof FormData || config.data instanceof FormData) {
      config.headers["Content-Type"] = "application/x-www-urlencoded";
    }
    if (isHref(config.url as string)) {
      config.baseURL = "";
    }
    return config;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

// http response 拦截器 response响应
request.interceptors.response.use(
  async (response) => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    return response.data;
  },
  (error: any) => {
    const config = error.response?.config ?? {};

    if (error.response && error.response.status) {
      if (config?.error_message as FunctionOrValue<string>) {
        // ElMessage.error(extraFunction(config.error_message, error.response) as string);
      } else {
        switch (error.response.status) {
          case 401:
          case 403:
            //                         if (sessionStorage.token) {
            //                             ElMessage({
            //                                 showClose: true,
            //                                 type: 'error',
            //                                 message: '登录已过期，请重新登录！'
            //                             });
            //                         } else {
            // //                            ElMessage({
            // //                                showClose: true,
            // //                                type: 'error',
            // //                                message: '无权限，请先登录！'
            // //                            });
            //                         }
            //                         sessionStorage.clear();
            //                         router.push("/login");
            break;
          // 404请求不存在
          case 404:
            break;
          // 其他错误，直接抛出错误提示
          default:
        }
      }
      return Promise.reject(error.response);
    }
  }
);

export default function requester<T>(
  method: string,
  url: string,
  data: any = null,
  config: DynamicProps<Partial<AxiosRequestConfig>> = {}
): Promise<T> {
  console.log(method, url, data);
  method = method.toLowerCase();
  const methodFilter = ["post", "get", "delete", "put", "patch"];
  const paramsFilter = ["get", "delete"];
  if (methodFilter.includes(method)) {
    const isParams = paramsFilter.includes(method);
    data = isParams
      ? {
          params: data
        }
      : { data };

    return request({
      method,
      url,
      headers: {},
      ...data,
      ...config
    });
  } else {
    console.error("未知的method" + method);
    return Promise.reject("未知的method" + method);
  }
}
/*@ts-ignore*/
export const withMockData: <T extends (...args: any) => any>(fn: T) => T =
  (() => {
    const cached: Record<string, any> | null = null;

    async function cacheMockJSON(url: string) {
      if (cached !== null) {
        return cached;
      }
      return fetch(url).then((d) => d.json());
    }

    return (fn) => {
      return async (
        url: string,
        data: AxiosRequestConfig["data"],
        config = {} as AxiosRequestType
      ) => {
        const is_need_mock =
          !config.disabled_mock &&
          getConfigurationFromGlobal("need_mock", isDev()) &&
          config.mock;
        if (config.mock) {
          console.group(
            "%cDebugging",
            "color: white;cursor:pointer;border-radius: 6px; padding:0 4px;font-style: italic; background-color: red;padding: 2px",
            url
          );
          try {
            console.table({
              url,
              data: JSON.stringify(data),
              mock: JSON.stringify(config.mock)
            });
          } catch {
            console.table({
              url,
              data: data,
              mock: JSON.stringify(config.mock)
            });
          }
          console.groupEnd();
        }

        if (is_need_mock) {
          await new Promise((resolve) => {
            delay(
              resolve,
              ~~random(getConfigurationFromGlobal("mock_max_interval", 500))
            );
          });
          const json_path = getConfigurationFromGlobal(
            "mock_json_path",
            "/mock_data.json"
          );
          if (json_path) {
            const data = await cacheMockJSON(json_path);
            console.log(data[url]);
            return data[url] ? { ...(data[url] ?? {}) } : { ...config.mock };
          }
          return { ...config.mock };
        }
        const res = (await fn(url, data, config)) as AxiosResponse["data"];
        if (config.mock) {
          console.group(
            "%cActually",
            "color: white;cursor:pointer;border-radius: 6px; padding:0 4px;font-style: italic; background-color: blue;padding: 2px",
            url
          );
          try {
            console.table({
              url,
              data: JSON.stringify(data),
              res: { ...res.data }
            });
          } catch {
            console.table({
              url,
              data: data,
              res: { ...res.data }
            });
          }
          console.groupEnd();
        }
        console.log("res", res);
        return await Promise.resolve(res);
      };
    };
  })();
type WithMockData<T> = {
  mock?: any;
  disabled_mock?: boolean;
} & T;
type ExtendedAxiosRequestConfig = DynamicProps<
  WithMockData<WithMessageProps<Partial<AxiosRequestType>>>
>;
type InferResponseFromMockData<U extends ExtendedAxiosRequestConfig> =
  U["mock"] extends undefined | never
    ? never
    : U["mock"] extends infer P
      ? P
      : never;
requester.get = withMockData(
  <T, U extends ExtendedAxiosRequestConfig = ExtendedAxiosRequestConfig>(
    url: string,
    params: any = {},
    config = {} as U
  ) => requester<InferResponseFromMockData<U>>("get", url, params, config)
);
requester.post = withMockData(
  <T, U extends ExtendedAxiosRequestConfig>(
    url: string,
    params: any = {},
    config = {} as U
  ) => requester<InferResponseFromMockData<U>>("post", url, params, config)
);
requester.delete = withMockData(
  <T, U extends ExtendedAxiosRequestConfig>(
    url: string,
    params: any = {},
    config = {} as U
  ) => requester<InferResponseFromMockData<U>>("delete", url, params, config)
);
requester.put = withMockData(
  <T, U extends ExtendedAxiosRequestConfig>(
    url: string,
    params: any = {},
    config = {} as U
  ) => requester<InferResponseFromMockData<U>>("put", url, params, config)
);
requester.patch = withMockData(
  <T, U extends ExtendedAxiosRequestConfig>(
    url: string,
    params: any = {},
    config = {} as U
  ) => requester<InferResponseFromMockData<U>>("patch", url, params, config)
);
