const { translate } = require('bing-translate-api');

const translationFunction = async (vocabulary, mainLanguage, languageTo) => {
    try {
        const res = await translate(vocabulary.toLowerCase(), mainLanguage, languageTo, true)
        return res
    } catch (error) {
        return err
    }
}

module.exports = translationFunction 