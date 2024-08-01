/**
 * @Description: 获取全局Window下的变量信息
 * @Date: 2024-07-09 11:54:33
 * @LastEditTime: 2024-07-09 12:00:29
 */
import _ from "underscore";

export const getConfigurationFromGlobal = <
  T extends keyof Window["config"],
  U extends Window["config"]
>(
  key: T,
  defaultValue?: U[T]
) => {
  const value = _.get((globalThis as unknown as Window).config, key);
  if (!_.isUndefined(value))
    console.warn("本应来自全局变量，但是现在来自默认值:", defaultValue);
  return (value ?? defaultValue) as U[T];
};
