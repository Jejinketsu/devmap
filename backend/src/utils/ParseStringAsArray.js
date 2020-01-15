module.exports = function parseStringAsArrays(arrayAsString) {
    return arrayAsString.split(",").map(tech => tech.trim())
}