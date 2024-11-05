interface OrderedMapItem {
  key: string;
}

interface OrderedMap<T extends OrderedMapItem> {
  blocks: {
    [items: string]: T;
  };
  order: string[];
}

function createEmptyOrderedMap<T extends OrderedMapItem>(): OrderedMap<T> {
  return {
    blocks: {},
    order: [],
  };
}

function createOrderedMapFromValues<T extends OrderedMapItem>(
  values: T[]
): OrderedMap<T> {
  const orderedMap = createEmptyOrderedMap();
  values.forEach(insertItemAtEnd.bind(null, orderedMap));
  return orderedMap as OrderedMap<T>;
}

function getOrderedMapSize<T extends OrderedMapItem>(
  orderedMap: OrderedMap<T>
): number {
  return orderedMap.order.length;
}

function insertItemAtIndex<T extends OrderedMapItem>(
  orderedMap: OrderedMap<T>,
  item: T,
  index: number
) {
  orderedMap.blocks[item.key] = item;
  orderedMap.order.splice(index, 0, item.key);
}

function insertItemAtEnd<T extends OrderedMapItem>(
  orderedMap: OrderedMap<T>,
  item: T
) {
  insertItemAtIndex(orderedMap, item, getOrderedMapSize(orderedMap));
}

function getOrderedMapValues<T extends OrderedMapItem>(
  orderedMap: OrderedMap<T>
): T[] {
  return orderedMap.order.map((key) => orderedMap.blocks[key]);
}

function removeItemFromOrderedMap<T extends OrderedMapItem>(
  orderedMap: OrderedMap<T>,
  item: T
) {
  delete orderedMap.blocks[item.key];
  orderedMap.order.splice(orderedMap.order.indexOf(item.key), 1);
}

function getItemByIndex<T extends OrderedMapItem>(
  orderedMap: OrderedMap<T>,
  index: number
) {
  if (index < 0 || index >= orderedMap.order.length) {
    return null;
  }
  return orderedMap.blocks[orderedMap.order[index]];
}

function getLastItem<T extends OrderedMapItem>(orderedMap: OrderedMap<T>) {
  return getItemByIndex(orderedMap, orderedMap.order.length - 1);
}

function getItemBeforeItem<T extends OrderedMapItem>(
  orderedMap: OrderedMap<T>,
  item: T
): T | null {
  const index = orderedMap.order.indexOf(item.key);
  if (index === 0) {
    return null;
  }
  return orderedMap.blocks[orderedMap.order[index - 1]];
}

function getItemAfterItem<T extends OrderedMapItem>(
  orderedMap: OrderedMap<T>,
  item: T
): T | null {
  const index = orderedMap.order.indexOf(item.key);
  if (index === getOrderedMapSize(orderedMap) - 1) {
    return null;
  }
  return orderedMap.blocks[orderedMap.order[index + 1]];
}

export {
  createEmptyOrderedMap,
  getOrderedMapSize,
  insertItemAtIndex,
  insertItemAtEnd,
  getOrderedMapValues,
  removeItemFromOrderedMap,
  getItemBeforeItem,
  getItemAfterItem,
  getItemByIndex,
  getLastItem,
  createOrderedMapFromValues,
};

export type { OrderedMap };
