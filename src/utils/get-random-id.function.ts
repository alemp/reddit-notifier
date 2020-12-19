/**
 * Generates a new random ID
 * @returns random ID
 */
export const getRandomIdFunction = (): string => {
  return Math.floor(Math.random() * 1_000_000_000_000).toString();
};
