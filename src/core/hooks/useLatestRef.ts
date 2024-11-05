import { RefObject, useRef } from "react";

function useLatestRef<T>(value: T): RefObject<T> {
  const valueRef = useRef(value);
  valueRef.current = value;
  return valueRef;
}

export { useLatestRef };
