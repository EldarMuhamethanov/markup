import { RefObject } from "react";
import { useEventHandler } from "../hooks/useEventHandler";

const useInputFile = (
  ref: RefObject<HTMLInputElement | null>,
  onLoad: (content: string, fileName: string) => void
) => {
  useEventHandler("input", ref, () => {
    const inputElement = ref.current as HTMLInputElement;
    if (!inputElement.files) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      onLoad(reader.result as string, inputElement.files?.[0].name || "");
      inputElement.value = "";
    };
    reader.readAsText(inputElement.files[0]);
  });
};

export { useInputFile };
