// Remove a space from a string and replace it with a hyphen
// Convert the string to lowercase
// Return the string
export const convertString = (key: string) => {
  return key.replace(/ /g, '-').toLowerCase();
};
