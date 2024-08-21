export function createFont(
  size?: number,
  weight?: string | number,
  family?: string
): string {
  return `${weight ?? "normal"} ${size ?? 12}px ${family ?? "Helvetica Neue"}`;
}
