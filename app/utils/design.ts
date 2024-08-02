/**
 * @Description:
 * @Date: 2024-07-09 15:21:16
 * @LastEditTime: 2024-07-09 15:23:01
 */
export const vw = (px: number | string) =>
  `${parseFloat(String(px).replace("px", "")) / 19.2}vw`;
