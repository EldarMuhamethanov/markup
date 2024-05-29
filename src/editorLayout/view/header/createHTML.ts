export const createHTMLDocument = (content: HTMLDivElement, title: string) => {
  return `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>${title}</title>
	</head>
	<body>
		${content.outerHTML}
	</body>
</html>	
`;
};
