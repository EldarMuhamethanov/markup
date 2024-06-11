const express = require("express");
const base64Img = require('base64-img');

const convertToBase64 = (url) => {
    return new Promise((resolve) => {
        base64Img.requestBase64(url, function (err, res, body) {
            if (err) console.log(err)
            else {
                resolve(body)
            }
        });
    })
}

module.exports = function (app) {
    app.use(express.json())

    app.post('/convert-images', async (req, res) => {
        const urls = req.body.urls

        const results = await Promise.allSettled(urls.map(url => convertToBase64(url)))

        const resultMap = {}

        urls.forEach((url, index) => {
            if (results[index]) {
                resultMap[url] = results[index].value
            }
        })
        res.json(resultMap)
    })
}