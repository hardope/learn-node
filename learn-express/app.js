const express = require('express')
const {ValidateUser} = require('./validate')
const app = express();

app.use(express.json())

users = [
    {id: 1, name: 'James', age: 19},
    {id: 2, name: 'Jarvis', age: 17},
    {id: 3, name: 'Friday', age: 18}
]

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.get('/users', (req, res) => {
    return res.send(users)
})

app.get('/user/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if(!user) res.status(404).send('The user with the given ID was not found.')
    return res.send(user)
})

app.post('/user', (req, res) => {

    const {error} = ValidateUser(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    const user = {
        id: users.length + 1,
        name: req.body.name,
        age: req.body.age
    }

    users.push(user)
    return res.send(user)
})

app.put('/user/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if(!user) res.status(404).send('The user with the given ID was not found.')

    const {error}= ValidateUser(req.body)

    if (error) {
        return res.status(400).send(error.details[0].message)
    }

    user.name = req.body.name
    user.age = req.body.age

    return res.send(user)
})

app.delete('/user/:id', (req, res) => {
    const user = users.find(user => user.id === parseInt(req.params.id))
    if(!user) res.status(404).send('The user with the given ID was not found.')

    const index = users.indexOf(user)
    users.splice(index, 1)

    return res.send(user)
})

const port = process.env.PORT || 3000;
app.listen(port, () => {console.log(`The application is running on localhost:${port}!`)})