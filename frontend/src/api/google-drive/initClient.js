function initClient() {
  gapi.client
    .init({
      // Ваш ключ API
      apiKey: GOOGLE_API_KEY,

      // Ваш идентификатор клиента
      clientId: GOOGLE_CLIENT_ID,

      // Указание, что мы хотим использовать Google Drive API v3
      discoveryDocs: [
        "https://www.googleapis.com/discovery/v1/apis/drive/v3/rest",
      ],
    })
    .then(
      () => {
        // Начинаем ловить события логина/логаута (см. ниже)
        // gapi.auth2.getAuthInstance().isSignedIn.listen(onSignIn)
        // инициализация приложения
        // initApp()
      },
      (error) => {
        console.log("Failed to init GAPI client", error);
        // работаем без гугла
        // initApp({showAlert: 'google-init-failed-alert'})
      }
    );
}
