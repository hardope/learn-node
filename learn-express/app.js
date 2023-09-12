const express = require('express')
const {ValidateUser} = require('./validate')
const Database = require('./storage')
const app = express();

app.use(express.json())

const db = new Database()

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.get('/users', (req, res) => {
    return res.send(db.get_all())
})

app.get('/user/:id', (req, res) => {
    const user = db.get_one(req.params.id)
    if(!user) return res.status(404).send('The user with the given ID was not found.')
    return res.send(user)
})

app.post('/user', (req, res) => {
    data = db.new(req.body)
    if (data.error) return res.status(400).send(data.error)
    return res.send(data)
})

app.put('/user/:id', (req, res) => {
    const user = db.update(req.params.id, req.body)
    if(!user) res.status(404).send('The user with the given ID was not found.')
    if (user.error) return res.status(400).send(user.error)
    return res.send(user)
})

app.delete('/user/:id', (req, res) => {
    const user = db.delete(req.params.id)
    if(!user) res.status(404).send('The user with the given ID was not found.')
    return res.send(user)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`The application is running on localhost:${port}!`)})