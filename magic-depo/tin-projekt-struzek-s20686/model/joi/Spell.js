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
            case "number.min":
                err.message = "wrongValue"
                break;
            case "number.max":
                err.message = "wrongValue"
                break;
            case "number.base":
                err.message = "isEmpty"
                break;
            default: break;
        }
    });
    return errors;
}

const spellSchema = Joi.object({
    SpellID: Joi.number().optional().allow(""),
    Name: Joi.string().min(3).max(30).required().error(errMessages),
    Description: Joi.string().max(200).allow("").error(errMessages),
    Mana_cost: Joi.number().min(1).max(9999).required().error(errMessages),
    mages: Joi.array().optional().allow("")
});

module.exports = spellSchema;

