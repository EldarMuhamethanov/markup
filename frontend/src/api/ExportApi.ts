const BASE_URLS = 'http://localhost:8000'

const convertImages = ({
	urls,
}: { urls: string[] }): Promise<Record<string, string>> => {
	return fetch(`${BASE_URLS}/convert-images`, {
		method: 'POST',
		body: JSON.stringify({
			urls,
		}),
		headers: {
			'Content-Type': 'application/json',
		}
	})
		.then((res: Response): Promise<Record<string, string>> => res.json())
		.catch(() => ({} as Record<string, string>))
}


export const ExportApi = {
	convertImages,
}