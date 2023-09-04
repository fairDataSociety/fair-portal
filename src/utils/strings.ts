export function shortenString(str: string): string {
  return str.length >= 9
    ? `${str.substring(0, 5)}...${str.substring(str.length - 4)}`
    : str;
}
