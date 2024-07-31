const express = require('express')
const app = express()
const port = 3000
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.send('Hello World from Pakistan')
})

app.get('/:slug', (req, res)=> { // We can get slugs as parameters
    console.log(req.query) // We can get queries through it
    console.log(req.params)
    res.send(`Hello from ${req.params.slug}`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})