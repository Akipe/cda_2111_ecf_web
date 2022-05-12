const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send("Bon courage à tous")
})

app.listen(8888, () => {
    console.log(`Application should be ready on port 8888 : http://localhost:8888/`)
})