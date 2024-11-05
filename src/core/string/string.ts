function stringSplice(
  str: string,
  start = 0,
  count = 0,
  newSymbols = ""
): string {
  const newString = [...str];
  newString.splice(start, count, ...newSymbols);
  return newString.join("");
}

export { stringSplice };
