const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./queries')

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.post('/register', db.createUser)


app.listen(3000, () => {
    console.log('Votre app est disponible sur localhost:3000 !')
})