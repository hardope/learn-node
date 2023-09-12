const Joi = require('joi')

function ValidateUser(user) {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        age: Joi.number().min(0).required()
    })

    return schema.validate(user)
}

exports.ValidateUser = ValidateUser;
