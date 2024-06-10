import { ContentStateData } from "../richtext/model/content/ContentState";
import { LocalStorage, STORAGE_KEYS } from "../core/localStorage/localStorage";
import { FileData, FilesData } from "../editorLayout/model/files/FileData";

function getAll(): FilesData {
  return (
    LocalStorage.getValue<FilesData>(STORAGE_KEYS.DOCUMENTS_CONTENT_DATA) || {}
  );
}

function getSelectedFileId(): string | null {
  return (
    LocalStorage.getValue<string | null>(STORAGE_KEYS.SELECTED_DOCUMENT_ID) ||
    null
  );
}

function updateFiles(files: FilesData) {
  LocalStorage.setValue<FilesData>(STORAGE_KEYS.DOCUMENTS_CONTENT_DATA, files);
}

function setSelectedFile(fileId: string | null) {
  LocalStorage.setValue<string | null>(
    STORAGE_KEYS.SELECTED_DOCUMENT_ID,
    fileId
  );
}

function addFile(file: FileData) {
  const files = getAll();
  files[file.id] = file;
  updateFiles(files);
}

function removeFile(fileId: string) {
  const files = getAll();
  delete files[fileId];
  updateFiles(files);
}

function renameFile(fileId: string, name: string) {
  const files = getAll();
  if (files[fileId]) {
    files[fileId].name = name;
    updateFiles(files);
  }
}

function updateFileContent(fileId: string, contentState: ContentStateData) {
  const files = getAll();
  if (files[fileId]) {
    files[fileId].contentState = contentState;
    updateFiles(files);
  }
}

function updateFile(fileId: string, data: FileData) {
  const files = getAll();
  if (files[fileId]) {
    files[fileId] = data;
    updateFiles(files);
  }
}

const FilesApi = {
  getAll,
  getSelectedFileId,
  updateFiles,
  setSelectedFile,
  addFile,
  removeFile,
  renameFile,
  updateFile,
  updateFileContent,
};

export { FilesApi };
