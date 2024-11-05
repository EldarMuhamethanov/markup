"use server";

export const createHTMLDocument = async (
  contentHTML: string,
  title: string
) => {
  const styles = await fetch("http://localhost:3000/Markdown.css", {
    headers: {
      Accept: "text/css,*/*",
    },
  });
  const stylesContent = await styles.text();

  return `
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title>${title}</title>
		<link rel="preconnect" href="https://fonts.googleapis.com">
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
		<link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet">
		<style>
			${stylesContent}
		</style>
	</head>
	<body>
		${contentHTML}
	</body>
</html>	
`;
};
