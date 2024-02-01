import { ContentStateData } from "../../../richtext/model/content/ContentState";

type FileData = {
  id: string;
  name: string;
  createdAt: number;
  contentState: ContentStateData;
};

type FilesData = {
  [items: string]: FileData;
};

export type { FileData, FilesData };
