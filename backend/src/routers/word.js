const express = require('express')
const router = new express.Router()
const Word = require('../models/word')
const auth = require('../middleware/auth')
const translateFunction = require('../utils/translate')

router.post('/words', auth, async (req, res) => {
    //If word was created; just show the word otherwise create the word and save the db
    const translateObject = await translateFunction(req.body.main, req.body.from, req.body.to)
    const mean = translateObject.translation
    const translated = `${req.body.from == "auto-detect" ? translateObject.toString().includes("Error") ? "Not Supported" : translateObject.language.from : req.body.from}-${req.body.to}`
    const myWord = new Word({ ...req.body, owner: req.user._id, mean, translated })
    const savedWord = await Word.findOne({ main: req.body.main, owner: req.user._id })

    try {

        if (!savedWord && !translateObject.toString().includes("Error")) {
            await myWord.save()
            return res.status(201).send({ data: myWord })
        }
        res.status(200).send({ data: myWord })
    } catch (error) {
        res.status(400).send({ error: error.toString() })
    }
})

router.get('/words', auth, async (req, res) => {
    try {
        const words = await Word.find({ owner: req.user._id })
        res.status(200).send({ data: words })
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/words/:id', auth, async (req, res) => {

    try {
        const word = await Word.findById(req.params.id)
        if (!word) {
            return res.status(404).send()
        }
        res.status(200).send(word)
    } catch (error) {
        res.status(400).send()
    }
})

//make favourtie-unfavourite
router.patch('/words/:id', auth, async (req, res) => {
    try {
        const word = await Word.findOne({ _id: req.params.id })
        if (!word) {
            return res.status(404).send()
        }
        word.fav = !word.fav
        await word.save()
        res.status(200).send({ data: word })
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.get('/favourites', auth, async (req, res) => {
    try {
        const words = await Word.find({ owner: req.user._id, fav: true })
        res.status(200).send({ data: words })
    } catch (error) {
        res.status(400).send()
    }
})

router.delete('/words/:id', auth, async (req, res) => {
    try {
        const word = await Word.findById(req.params.id)
        if (!word) {
            return res.status(404).send({ error: 'Word not found' })
        }
        await word.remove()
        res.status(200).send(word)
    } catch (error) {
        res.status(500).send()
    }
})

module.exports = router