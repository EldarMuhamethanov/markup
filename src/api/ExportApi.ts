import { convertImages as convertImagesResponse } from "@/backend/convertImages";

const convertImages = ({
  urls,
}: {
  urls: string[];
}): Promise<Record<string, string>> => {
  return convertImagesResponse(urls);
};

export const ExportApi = {
  convertImages,
};
