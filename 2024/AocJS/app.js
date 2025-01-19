const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 3000

app.use(express.static('pub'))
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`)
})
