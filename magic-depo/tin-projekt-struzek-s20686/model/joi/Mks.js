const Joi = require('joi');

const errMessages = (errors) => {
    errors.forEach(err => {
        switch(err.code){
            case "string.empty":
                err.message = "isEmpty"
                break;
            case "string.min":
                err.message = "isEmpty"
                break;
            case "number.min":
                err.message = "isEmpty"
                break;
            default: break;
        }
    });
    return errors;
}

const mksSchema = Joi.object({
    MksID: Joi.number().optional().allow(""),
    Mage_MageID: Joi.number().min(1).required().error(errMessages),
    Spell_SpellID: Joi.number().min(1).required().error(errMessages),
    Learned_date: Joi.date().required().error(errMessages),
    Mastery_level: Joi.string().min(2).required().error(errMessages), //aby na pewno nie przyjelo pustej wartosci z radio
    mage: Joi.optional(),
    spell: Joi.optional()
});

module.exports = mksSchema;

