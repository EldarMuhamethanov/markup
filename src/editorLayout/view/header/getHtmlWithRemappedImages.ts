import {ExportApi} from "../../../api/ExportApi";

export async function getHtmlWithRemappedImages(html: HTMLDivElement) {
	const urlToImageBlockMap: Record<string, Array<HTMLImageElement>> = {}
	html.querySelectorAll('img')
		.forEach(img => {
			if (!urlToImageBlockMap[img.src]) {
				urlToImageBlockMap[img.src] = [img]
			}
			urlToImageBlockMap[img.src].push(img)
		})
	const resultMap = await ExportApi.convertImages({
		urls: Object.keys(urlToImageBlockMap)
	})

	Object.entries(resultMap).forEach(([url, base64]) => {
		const imgBlocks = urlToImageBlockMap[url]
		imgBlocks.forEach(imgBlock => {
			imgBlock.src = base64
		})
	})

	return () => {
		Object.entries(urlToImageBlockMap).forEach(([url, images]) => {
			images.forEach(imgBlock => {
				imgBlock.src = url
			})
		})
	}
}