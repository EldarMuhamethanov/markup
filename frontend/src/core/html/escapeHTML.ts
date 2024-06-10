export const escapeHTML = (str: string) => {
  const div = document.createElement("div");
  div.innerText = str;
  return div.innerHTML;
};
