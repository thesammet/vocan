const mongoose = require('mongoose')

const wordSchema = new mongoose.Schema({
    main: {
        type: String,
        required: true,
    },
    mean: {
        type: String,
        required: true,
    },
    translated: {
        type: String, //en-tr
        required: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

wordSchema.methods.toJSON = function () {
    const word = this
    const wordObject = word.toObject()

    delete wordObject.__v

    return wordObject
}


const Word = mongoose.model('Word', wordSchema)

module.exports = Word