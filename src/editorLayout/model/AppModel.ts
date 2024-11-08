import { FilesDataModel } from "./files/FilesDataModel";
import { SelectedDocumentData } from "./documents/SelectedDocumentData";
import { DocumentsMenuModel } from "./documents/DocumentsMenuModel";
import { EditorLayoutModel } from "./layout/EditorLayoutModel";
import { SidebarLayoutModel } from "./layout/SidebarLayoutModel";

const filesDataModel = new FilesDataModel();
const selectedDocumentData = new SelectedDocumentData(filesDataModel);
const documentsMenuModel = new DocumentsMenuModel(
  selectedDocumentData,
  filesDataModel
);
const editorLayoutModel = new EditorLayoutModel();

const sidebarLayoutModel = new SidebarLayoutModel();

export {
  filesDataModel,
  selectedDocumentData,
  documentsMenuModel,
  editorLayoutModel,
  sidebarLayoutModel,
};
