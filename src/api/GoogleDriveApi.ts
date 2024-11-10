import axios from "axios";

interface GoogleAuthResponse {
  error?: string;
  access_token: string;
}

interface GooglePickerDoc {
  id: string;
  name: string;
}

interface GooglePickerResponse {
  action: string;
  docs: GooglePickerDoc[];
}

interface TokenClient {
  callback: (response: GoogleAuthResponse) => void;
  requestAccessToken: (options: { prompt: string }) => void;
}

declare global {
  interface Window {
    google: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: GoogleAuthResponse) => void;
          }) => TokenClient;
        };
      };
      picker: {
        Action: {
          PICKED: string;
          CANCEL: string;
        };
        DocsView: new () => GooglePickerView;
        PickerBuilder: new () => GooglePickerBuilder;
        ViewId: {
          FOLDERS: string;
        };
        DocsViewMode: {
          LIST: string;
          GRID: string;
        };
      };
    };
    gapi: {
      load: (api: string, callback: () => void) => void;
      client: {
        init: (config: {
          apiKey: string;
          discoveryDocs: string[];
        }) => Promise<void>;
      };
    };
  }
}

interface GooglePickerView {
  setIncludeFolders: (include: boolean) => GooglePickerView;
  setMimeTypes: (mimeTypes: string) => GooglePickerView;
  setMode: (mode: string) => GooglePickerView;
  setSelectFolderEnabled: (enabled: boolean) => GooglePickerView;
}

interface GooglePickerBuilder {
  addView: (view: GooglePickerView) => GooglePickerBuilder;
  setOAuthToken: (token: string) => GooglePickerBuilder;
  setDeveloperKey: (key: string) => GooglePickerBuilder;
  setTitle: (title: string) => GooglePickerBuilder;
  setCallback: (
    callback: (data: GooglePickerResponse) => void
  ) => GooglePickerBuilder;
  build: () => GooglePicker;
}

interface GooglePicker {
  setVisible: (visible: boolean) => void;
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY || "";
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

class GoogleDriveApi {
  private static instance: GoogleDriveApi;
  private accessToken: string | null = null;
  private gapiInitialized: boolean = false;
  private tokenClient: TokenClient | null = null;
  private pickerInitialized: boolean = false;

  private constructor() {}

  static getInstance(): GoogleDriveApi {
    if (!GoogleDriveApi.instance) {
      GoogleDriveApi.instance = new GoogleDriveApi();
    }
    return GoogleDriveApi.instance;
  }

  async init() {
    if (this.gapiInitialized) {
      return;
    }

    await this.loadGoogleApi();
    await this.initClient();
    this.gapiInitialized = true;
  }

  private async loadGoogleApi(): Promise<void> {
    if (typeof window === "undefined") return;

    return new Promise((resolve) => {
      const script1 = document.createElement("script");
      script1.src = "https://accounts.google.com/gsi/client";
      script1.async = true;
      script1.defer = true;
      document.body.appendChild(script1);

      const script2 = document.createElement("script");
      script2.src = "https://apis.google.com/js/api.js";
      script2.onload = () => {
        window.gapi.load("client:picker", async () => {
          await window.gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            discoveryDocs: [
              "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
            ],
          });
          resolve();
        });
      };
      document.body.appendChild(script2);
    });
  }

  private async initClient(): Promise<void> {
    if (typeof window === "undefined") return;

    this.tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: GOOGLE_CLIENT_ID!,
      scope: "https://www.googleapis.com/auth/drive.file",
      callback: (response: GoogleAuthResponse) => {
        if (response.error !== undefined) {
          throw response;
        }
        this.accessToken = response.access_token;
      },
    });
  }

  async showPicker(type: "import" | "export"): Promise<
    | {
        name: string;
        content: string;
        folderId?: string;
        action: "picked" | "cancelled";
      }
    | undefined
  > {
    if (!this.pickerInitialized) {
      await this.loadPickerApi();
    }

    if (!this.accessToken) {
      await this.authorize();
    }

    return new Promise((resolve, reject) => {
      const view =
        type === "import"
          ? new window.google.picker.DocsView()
              .setIncludeFolders(false)
              .setMimeTypes("text/markdown")
              .setMode(window.google.picker.DocsViewMode.LIST)
          : new window.google.picker.DocsView(
              // @ts-expect-error ts(2554)
              window.google.picker.ViewId.FOLDERS
            )
              .setIncludeFolders(true)
              .setSelectFolderEnabled(true)
              .setMode(window.google.picker.DocsViewMode.GRID);

      const picker = new window.google.picker.PickerBuilder()
        .addView(view)
        .setOAuthToken(this.accessToken!)
        .setDeveloperKey(GOOGLE_API_KEY)
        .setTitle(
          type === "export"
            ? "Выберите папку для сохранения"
            : "Выберите файл для импорта"
        )
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .setCallback(async (data: any) => {
          if (data.action === window.google.picker.Action.PICKED) {
            const file = data.docs[0];
            if (type === "import") {
              try {
                const { name, content } = await this.downloadFile(file.id);
                resolve({ name, content, action: "picked" });
              } catch (error) {
                reject(error);
              }
            } else {
              resolve({
                name: "",
                content: "",
                folderId: file.id,
                action: "picked",
              });
            }
          } else if (data.action === window.google.picker.Action.CANCEL) {
            if (type === "export") {
              resolve({ name: "", content: "", action: "cancelled" });
            } else {
              resolve(undefined);
            }
          }
        })
        .build();
      picker.setVisible(true);
    });
  }

  private async loadPickerApi(): Promise<void> {
    if (typeof window === "undefined") return;

    return new Promise((resolve) => {
      window.gapi.load("picker", () => {
        this.pickerInitialized = true;
        resolve();
      });
    });
  }

  async authorize(): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      if (!this.gapiInitialized) {
        await this.init();
      }

      return new Promise((resolve, reject) => {
        try {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          this.tokenClient!.callback = async (response: any) => {
            if (response.error !== undefined) {
              reject(response);
            }
            this.accessToken = response.access_token;
            resolve();
          };
          this.tokenClient!.requestAccessToken({ prompt: "consent" });
        } catch (err) {
          console.error("Ошибка авторизации:", err);
          reject(err);
        }
      });
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      throw error;
    }
  }

  async uploadFile(
    name: string,
    content: string,
    folderId?: string
  ): Promise<string> {
    if (!this.accessToken) {
      throw new Error("Не авторизован");
    }

    const metadata = {
      name,
      mimeType: "text/markdown",
      parents: folderId ? [folderId] : undefined,
    };

    const file = new Blob([content], { type: "text/markdown" });

    const form = new FormData();
    form.append(
      "metadata",
      new Blob([JSON.stringify(metadata)], { type: "application/json" })
    );
    form.append("file", file);

    const response = await axios.post(
      "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
      form,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    return response.data.id;
  }

  async downloadFile(
    fileId: string
  ): Promise<{ name: string; content: string }> {
    if (!this.accessToken) {
      throw new Error("Не авторизован");
    }

    const metadataResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${fileId}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    const contentResponse = await axios.get(
      `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
      }
    );

    return {
      name: metadataResponse.data.name,
      content: contentResponse.data,
    };
  }

  async listFiles(): Promise<Array<{ id: string; name: string }>> {
    if (!this.accessToken) {
      throw new Error("Не авторизован");
    }

    const response = await axios.get(
      "https://www.googleapis.com/drive/v3/files",
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
        },
        params: {
          q: "mimeType='text/markdown'",
          fields: "files(id, name)",
        },
      }
    );

    return response.data.files;
  }
}

export const googleDriveApi = GoogleDriveApi.getInstance();
