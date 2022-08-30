const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Word = require('../models/word')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        validate(username) {
            if (username < 4) {
                throw new Error({ error: 'Username greater than 4 characters!' })
            }
        },
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.default.isEmail(value)) {
                throw new Error('Email is not validated!')
            }
        },
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 8,
        trim: true,
    },
    history: {
        type: Boolean,
        default: true,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
},
    {
        timestamps: true
    })

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    //delete userObject.password
    delete userObject.__v
    delete userObject.tokens

    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

userSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('Unable to login user')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login password')
    }
    return user
}

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

//delete user tasks when user removed
userSchema.pre('remove', async function (next) {
    const user = this
    await Word.deleteMany({ owner: user._id })
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User