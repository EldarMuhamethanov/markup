function getValueByCheckedKey<T>(
  key: string | number,
  map: { [items: string]: T }
) {
  if (!map.hasOwnProperty(key)) {
    throw new Error(`getValueByCheckedKey(${key})`);
  }
  return map[key];
}

export { getValueByCheckedKey };
