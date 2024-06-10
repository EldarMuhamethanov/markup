import { FilesDataModel } from "./files/FilesDataModel";
import { SelectedDocumentData } from "./documents/SelectedDocumentData";
import { DocumentsMenuModel } from "./documents/DocumentsMenuModel";
import { CreateFileModel } from "./filesActionsModals/CreateFileModel";
import { CreateFolderModel } from "./filesActionsModals/CreateFolderModel";
import { RenameDocumentModel } from "./filesActionsModals/RenameDocumentModel";

const filesDataModel = new FilesDataModel();
const selectedDocumentData = new SelectedDocumentData(filesDataModel);
const documentsMenuModel = new DocumentsMenuModel(
  selectedDocumentData,
  filesDataModel
);

const createFileModel = new CreateFileModel(documentsMenuModel);
const createFolderModel = new CreateFolderModel(documentsMenuModel);
const renameDocumentModel = new RenameDocumentModel(documentsMenuModel);

export {
  filesDataModel,
  selectedDocumentData,
  documentsMenuModel,
  createFileModel,
  createFolderModel,
  renameDocumentModel,
};
