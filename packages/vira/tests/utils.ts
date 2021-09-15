export function waitUntil(timeInMilliseconds: number = 100): Promise<void> {
  return new Promise((resolve, _) => {
    setTimeout(resolve, timeInMilliseconds);
  });
}
