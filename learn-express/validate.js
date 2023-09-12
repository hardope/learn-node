const Joi = require('joi')

function ValidateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        age: Joi.number().min(18).required()
    })

    return schema.validate(user)
}

exports.ValidateUser = ValidateUser;