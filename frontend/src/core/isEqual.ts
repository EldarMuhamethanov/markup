function isEqual<T>(prevData: T, currData: T): boolean {
  return JSON.stringify(prevData) === JSON.stringify(currData);
}

export { isEqual };
