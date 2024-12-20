const downloadAsFile = (data: string, fileName: string) => {
  const a = document.createElement("a");
  const file = new Blob([data], { type: "text/plain" });
  a.href = URL.createObjectURL(file);
  a.download = fileName;
  a.click();
};

export { downloadAsFile };
