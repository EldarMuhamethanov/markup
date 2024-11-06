type StorageKey =
  | "currentDocumentData"
  | "selectedDocumentId"
  | "documentsData"
  | "documentsContentData"
  | "editorLeftPaneWidth";

type StorageKeys = Record<string, StorageKey>;

const STORAGE_KEYS: StorageKeys = {
  CURRENT_DOCUMENT_DATA: "currentDocumentData",
  SELECTED_DOCUMENT_ID: "selectedDocumentId",
  DOCUMENTS_DATA: "documentsData",
  DOCUMENTS_CONTENT_DATA: "documentsContentData",
  EDITOR_LEFT_PANE_WIDTH: "editorLeftPaneWidth",
};

function setValue<T>(key: StorageKey, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getValue<T>(key: StorageKey): T | null {
  const item = localStorage.getItem(key);
  return item ? (JSON.parse(item) as T) : null;
}

function removeValue(key: StorageKey) {
  localStorage.removeItem(key);
}

const LocalStorage = {
  setValue,
  getValue,
  removeValue,
};

export { LocalStorage, STORAGE_KEYS };
