const express = require("express")
const base64Img = require('base64-img')
const fs = require('fs')
const axios = require('axios')

const CONTENT_TYPE_TO_EXTENSION_MAP = {
    'image/jpeg': '.jpg',
    'image/png': '.png',
    'image/svg+xml': '.svg',
}

const EXTENSION_TO_CONTENT_TYPE_MAP = {
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
}

const downloadImage = (url, image_path) =>
    axios({
        url,
        responseType: 'stream',
    }).then(
        response => {
            const extension = CONTENT_TYPE_TO_EXTENSION_MAP[response.headers['content-type']]
            return new Promise((resolve, reject) => {
                response.data
                    .pipe(fs.createWriteStream(`${image_path}${extension}`))
                    .on('finish', () => resolve(extension))
                    .on('error', e => reject(e));
            })
        }
    );

const imageUrlToBase64 = async (url, index) => {
    const extension = await downloadImage(url, `./temp${index}`)
    const base64 = await fs.promises.readFile(`./temp${index}${extension}`, "base64");
    await fs.promises.unlink(`./temp${index}${extension}`)
    const contentType = EXTENSION_TO_CONTENT_TYPE_MAP[extension]
    return `data:${contentType};base64,${base64}`
};

module.exports = function (app) {
    app.use(express.json())

    app.post('/convert-images', async (req, res) => {
        const urls = req.body.urls

        const results = await Promise.allSettled(urls.map((url, index) => imageUrlToBase64(url, index)))

        const resultMap = {}

        urls.forEach((url, index) => {
            if (results[index]) {
                resultMap[url] = results[index].value
            }
        })
        res.json(resultMap)
    })
}