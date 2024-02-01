import { DocumentData } from "./DocumentsMenuModel";

function getDocumentData(
  documents: DocumentData[],
  documentId: string
): DocumentData | null {
  const stack: DocumentData[][] = [documents];

  while (stack.length) {
    const currentDocuments: DocumentData[] = stack.pop() || [];
    for (const document of currentDocuments) {
      if (document.id === documentId) {
        return document;
      }
      if (document.type === "folder") {
        stack.push(document.files);
      }
    }
  }

  return null;
}

export { getDocumentData };
