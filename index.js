const express = require("express")
const app = express()
const port = 5125
const fs = require("fs")
app.use(express.json())

console.log("Init...\nListening on port 5125")

app.post("/sensor/:id", (req, res) => {
    console.log(req.body)
    fs.writeFile("luft.txt", `${req.body.sensordatavalues[0].value}\n${req.body.sensordatavalues[1].values}`, (err) => {
        console.log("file saved")
    })
    res.send("WORKS")
})

app.listen(port)
