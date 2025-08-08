export function formatFraction(fraction: number): string {
  return (fraction * 100).toFixed(0).padStart(3, " ") + "%";
}
