import axios from "axios";

declare global {
  interface Window {
    // @ts-expect-error ts(2304)
    gapi: typeof gapi;
  }
}

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;
const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

class GoogleDriveApi {
  private static instance: GoogleDriveApi;
  private accessToken: string | null = null;
  private gapiInitialized: boolean = false;

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
    // Загружаем Google API Client
    await this.loadGoogleApi();
    await this.initClient();
    this.gapiInitialized = true;
  }

  private async loadGoogleApi(): Promise<void> {
    if (typeof window === "undefined") return;

    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://apis.google.com/js/api.js";
      script.onload = () => {
        window.gapi.load("client:auth2", resolve);
      };
      document.body.appendChild(script);
    });
  }

  private async initClient(): Promise<void> {
    if (typeof window === "undefined") return;

    await window.gapi.client.init({
      apiKey: GOOGLE_API_KEY,
      clientId: GOOGLE_CLIENT_ID,
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      ],
      scope: "https://www.googleapis.com/auth/drive.file",
    });
  }

  async authorize(): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      if (!this.gapiInitialized) {
        await this.init();
      }

      const authInstance = window.gapi.auth2.getAuthInstance();
      await authInstance.signIn();
      this.accessToken = authInstance.currentUser
        .get()
        .getAuthResponse().access_token;
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      throw error;
    }
  }

  async uploadFile(name: string, content: string): Promise<string> {
    if (!this.accessToken) {
      throw new Error("Не авторизован");
    }

    const file = new Blob([content], { type: "text/markdown" });
    const metadata = {
      name,
      mimeType: "text/markdown",
    };

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
