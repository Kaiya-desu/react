const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "string.empty":
                err.message = "isEmpty"
                break;
            case "string.min":
                err.message = "wrongValue"
                break;
            case "string.max":
                err.message = "wrongValue"
                break;
            case "string.email":
                err.message = "wrongEmail"
                break;
            default: break;
        }
    });
    return errors;
}

const mageSchema = Joi.object({
    MageID: Joi.number().optional().allow(""),
    Name: Joi.string().min(3).max(20).required().error(errMessages),
    Surname: Joi.string().min(3).max(20).required().error(errMessages),
    Title: Joi.string().min(0).max(100).error(errMessages),
    Certified_date: Joi.date().required().error(errMessages),
    Email: Joi.string().email().required().error(errMessages),
    Password: Joi.string().required().error(errMessages),
    Role: Joi.number().required().error(errMessages),
    spells: Joi.array().optional().allow("")
});

module.exports = mageSchema;


