const dialogo = require('./response.json')
const bestemmie = require('./bestemmioni.json')

module.exports.init = function () {
    const r = getRandomIntInclusive(0, dialogo.length-1)

    return {...dialogo[r], regex: new RegExp(dialogo[r].risposta, 'mgi')}
}

module.exports.randomizeBestemmione = function () {
    const r = getRandomIntInclusive(0, bestemmie.length-1)

    return bestemmie[r]


}


function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //Il max è incluso e il min è incluso 
  }


