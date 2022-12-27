const mongoose = require('mongoose')
const celebrantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        },
        type: {
            type: String,
            required: true
        },
        dateOfBirth: {
            type: Date,
            required: true
        },
        img:
        {
            data: Buffer,
            contentType: String
        },
        expireAt: {
            type: Date,
            default: new Date(new Date().valueOf() + 86400),
            // set to 86400 at deployment
            expires: 30
        }
    }
)


const Celebrant = mongoose.model('Celebrant', celebrantSchema)

module.exports = Celebrant;