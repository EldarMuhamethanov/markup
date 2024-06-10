function verify<T>(statement: T | null | undefined) {
  console.assert(statement);
  return statement as T;
}

export { verify };
