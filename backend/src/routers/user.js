const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const _ = require('lodash')
const auth = require('../middleware/auth')

router.post('/users', async (req, res) => {
    const user = new User(req.body)
    try {
        const token = await user.generateAuthToken()
        await user.save()

        //delete the token property on spesific spots lodash
        const userModelFiltered = _.omit(user.toObject(), ["_id", "__v", "tokens"])

        res.status(201).send({ user: userModelFiltered, token })
    } catch (error) {
        res.status(400).send({ error: error.toString() })
    }

})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (error) {
        res.status(400).send({ error: error.toString() })
    }
})

router.post('/social-login', async (req, res) => {

    try {
        const isUser = await User.find({ email: req.body.email })
        if (isUser.length == 0) {
            const newUser = new User({ ...req.body, socialLogin: true })
            const newToken = await newUser.generateAuthToken()
            await newUser.save()
            return res.status(201).send({ user: newUser, token: newToken })
        }
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (error) {
        res.status(400).send({ error: error })
    }
})

router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['username', 'password', 'email']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }
    try {
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        res.status(200).send(req.user)
    } catch (error) {
        res.status(400).send({ error })
    }
})

router.patch('/word-history', auth, async (req, res) => {
    try {
        req.user.history = !req.user.history
        await req.user.save()
        res.status(200).send({ data: { history: req.user.history } })
        res.status
    } catch (error) {
        res.status(400).send({ error: error })
    }
})

router.get('/users/me', auth, async (req, res) => {
    try {
        res.status(200).send({ user: req.user })
    } catch (error) {
        res.status(404).send({ error: error.toString() })
    }
})

//get all users
router.get('/users', auth, async (req, res) => {
    const users = await User.find()
    try {
        res.status(200).send(users)
    } catch (error) {
        res.status(404).send({ error: error.toString })
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        const user = req.user
        await user.remove()
        res.status(200).send({ user })
    } catch (error) {
        res.status(404).send({ error })
    }
})


module.exports = router