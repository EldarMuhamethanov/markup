import { FilesDataModel } from "./files/FilesDataModel";
import { SelectedDocumentData } from "./documents/SelectedDocumentData";
import { DocumentsMenuModel } from "./documents/DocumentsMenuModel";
import { EditorLayoutModel } from "./layout/EditorLayoutModel";

const filesDataModel = new FilesDataModel();
const selectedDocumentData = new SelectedDocumentData(filesDataModel);
const documentsMenuModel = new DocumentsMenuModel(
  selectedDocumentData,
  filesDataModel
);
const editorLayoutModel = new EditorLayoutModel();

export { 
  filesDataModel, 
  selectedDocumentData, 
  documentsMenuModel,
  editorLayoutModel 
};
