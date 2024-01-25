export const getRandomeNumber = (
  min: number = 0,
  max: number = 10,
  numAfterDigit = 0
): number => +(Math.random() * (max - min) + min).toFixed(numAfterDigit);

export const getRandomItem = <T>(items: T[]): T =>
  items[getRandomeNumber(0, items.length - 1)];

export const getRandomItems = <T>(items: T[]): T[] => {
  const startPosition = getRandomeNumber(0, items.length - 1);
  const endPosition =
    startPosition + getRandomeNumber(startPosition, items.length);

  return items.slice(startPosition, endPosition);
};
