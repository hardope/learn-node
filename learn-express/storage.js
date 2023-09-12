const {ValidateUser} = require('./validate')
const FileSystem = require('fs')

class Database {

    constructor() {
        this.load()
    }

    get_all() {
        return this.users
    }

    get_one(id) {
        const user = this.users.find(user => user.id === parseInt(id))
        if (!user) return false
        return user
    }
    
    new (data) {
        const {error} = ValidateUser(data)
        if (error) return {error: error.details[0].message}

        const user = {
            id: this.users.length + 1,
            name: data.name,
            age: data.age
        }

        this.users.push(user)
        this.save()
        return user
    }

    update(id, data) {
        const user = this.users.find(user => user.id === parseInt(id))
        if (!user) return false

        const {error} = ValidateUser(data)
        if (error) return {error: error.details[0].message}

        user.name = data.name
        user.age = data.age

        this.save()
        return user
    }

    delete(id) {
        const user = this.users.find(user => user.id === parseInt(id))
        if (!user) return false

        const index = this.users.indexOf(user)
        this.users.splice(index, 1)

        this.save()
        return user
    }

    save() {
        FileSystem.writeFileSync('users.json', JSON.stringify(this.users))
    }

    load() {
        try {
            this.users = JSON.parse(FileSystem.readFileSync('users.json'))
        } catch (error) {
            this.users = []
        }
    }
}

module.exports = Database