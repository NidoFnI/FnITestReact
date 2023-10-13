require('dotenv').config()

const express = require('express')
const app = express()

app.use(express.json());

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send(`Yo! Env = ${process.env.TEST}`)
})

app.get("/open", (req, res, next) => {
  res.json(["Hello", "World!"]);
});

app.listen(process.env.PORT || 3000)