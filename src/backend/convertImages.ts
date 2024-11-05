"use server";

import fs from "fs";
import axios from "axios";

const CONTENT_TYPE_TO_EXTENSION_MAP: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/svg+xml": ".svg",
};

const EXTENSION_TO_CONTENT_TYPE_MAP: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

const downloadImage = (url: string, image_path: string): Promise<string> =>
  axios({
    url,
    responseType: "stream",
  }).then((response) => {
    const extension =
      CONTENT_TYPE_TO_EXTENSION_MAP[response.headers["content-type"]];
    return new Promise((resolve, reject) => {
      response.data
        .pipe(fs.createWriteStream(`${image_path}${extension}`))
        .on("finish", () => resolve(extension))
        .on("error", (e: Error) => reject(e));
    });
  });

const imageUrlToBase64 = async (url: string, index: number) => {
  const extension = await downloadImage(url, `./temp${index}`);
  const base64 = await fs.promises.readFile(
    `./temp${index}${extension}`,
    "base64"
  );
  await fs.promises.unlink(`./temp${index}${extension}`);
  const contentType = EXTENSION_TO_CONTENT_TYPE_MAP[extension];
  return `data:${contentType};base64,${base64}`;
};

export const convertImages = async (urls: string[]) => {
  const results = await Promise.allSettled(
    urls.map((url, index) => imageUrlToBase64(url, index))
  );
  const resultMap: Record<string, string> = {};
  urls.forEach((url, index) => {
    if (results[index] && results[index].status === "fulfilled") {
      resultMap[url] = (results[index] as PromiseFulfilledResult<string>).value;
    }
  });

  return resultMap;
};
