function optionalArray<T>(
  array: Array<T | null | undefined | false>
): Array<T> {
  const newArray: T[] = [];
  array.forEach((item) => {
    !!item && newArray.push(item);
  });
  return newArray;
}

function getArrayWithNElements(n: number) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push(i);
  }
  return arr;
}

export { optionalArray, getArrayWithNElements };
