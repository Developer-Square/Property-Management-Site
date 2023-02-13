// A function that generates a random number between 1 and 7
export const randomNumber = (range: number) => {
  return Math.floor(Math.random() * range) + 1;
};
