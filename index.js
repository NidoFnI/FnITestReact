require('dotenv').config()
const express = require('express')
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send(`Yo! Env = ${process.env.TEST}`)
})
app.listen(process.env.PORT || 3000)