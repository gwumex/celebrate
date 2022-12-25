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
        }
    }
)


const Celebrant = mongoose.model('Celebrant', celebrantSchema)

module.exports = Celebrant;