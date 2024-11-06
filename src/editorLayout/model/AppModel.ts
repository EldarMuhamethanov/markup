import { FilesDataModel } from "./files/FilesDataModel";
import { SelectedDocumentData } from "./documents/SelectedDocumentData";
import { DocumentsMenuModel } from "./documents/DocumentsMenuModel";

const filesDataModel = new FilesDataModel();
const selectedDocumentData = new SelectedDocumentData(filesDataModel);
const documentsMenuModel = new DocumentsMenuModel(
  selectedDocumentData,
  filesDataModel
);

export { filesDataModel, selectedDocumentData, documentsMenuModel };
