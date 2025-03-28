export const capitalizeFirstLetter = (str: string): string => {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export function generatePrefixes(word: string) {
  word = word.toLowerCase(); // Convert to lowercase
  let prefixes = [];

  for (let i = 1; i <= word.length; i++) {
    prefixes.push(word.slice(0, i));
  }

  return prefixes;
}
