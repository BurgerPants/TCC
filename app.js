const express = require('express')
const app = express()
const port = 3000

app.use(express.static(__dirname+"/public/Assets"))

app.get('/', (req, res) => {
   res.sendFile(__dirname+"/public/index.html")
})

app.listen(port, () => {
   console.log(`Example app listening on port ${port}!`)
})