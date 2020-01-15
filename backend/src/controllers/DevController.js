const axios = require("axios")
const Dev = require("../models/dev")
const parseStringAsArray = require("../utils/ParseStringAsArray")

module.exports = {
    async index(request, responde) {
        const devs = Dev.find()
        return response.json(devs)
    },

    async store(request, response) {
        const { github_username, techs, latitude, longitude } = request.body

        let dev = await Dev.findOne({ github_username })

        if (!dev) {
            const ApiResponse = await axios.get(`https://api.github.com/users/${github_username}`)

            const { name = login, avatar_url, bio } = ApiResponse.data

            const techsArray = parseStringAsArray(techs)

            const location = {
                type: "Point",
                coordinates: [longitude, latitude],
            }

            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs: techsArray,
                location,
            })
        }

        return response.json(dev)
    },
}