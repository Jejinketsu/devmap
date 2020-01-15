const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes")

const app = express()
mongoose.connect("mongodb+srv://jederilson:J625345s@cluster0-ygkkt.mongodb.net/week10?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json())
app.use(routes)

app.listen(3333)