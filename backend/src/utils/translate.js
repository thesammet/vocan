const { translate } = require('bing-translate-api');

const translationFunction = async (vocabulary, languageTo) => {
    try {
        const res = await translate(vocabulary.toLowerCase(), null, languageTo, true)
        return res
    } catch (error) {
        return err
    }
}

module.exports = translationFunction 