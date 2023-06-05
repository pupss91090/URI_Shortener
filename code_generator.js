function getRandomInt(max) {
    return Math.floor(Math.random() * max)
}

function codeGenerator() {
    // characters database
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz'
    const upperCaseLetters = lowerCaseLetters.toUpperCase()
    const numbers = '1234567890'
    // push characters into collection depends on data
    const letterDatabase = lowerCaseLetters + upperCaseLetters + numbers
    const letterArr = letterDatabase.split('')
    // random generate code
    let ansCode = ""
    const passwordLength = 5
    for (let i = 0; i < passwordLength; i++) {
        ansCode += letterArr[getRandomInt(letterArr.length)]
    }
    return ansCode
}

module.exports = codeGenerator