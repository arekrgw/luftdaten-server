const express = require("express")
const app = express()
const argv = require("yargs").argv
const port = argv.port
const fs = require("fs")
app.use(express.json())
console.log("Init...")

if(!argv.path) {
    console.log("You have to provide path to destination folder")
}
else if(!argv.port){
    console.log("You have to provide port");
}
else{
    console.log(`Listening on port ${port}`)


    app.post("/sensor/:id", (req, res) => {
        let id = req.params.id ? req.params.id : Math.floor(Math.random() * (100000 - 1000 + 1) + 1000)

        console.log(req.body)
        //Save air condition
        fs.writeFile(
          `${argv.path}/air_condition_${id}.txt`,
          `${req.body.sensordatavalues[0].value}\n${req.body.sensordatavalues[1].value}`,
          err => {
            console.log("Air condition saved");
          }
        );
        fs.writeFile(
          `${argv.path}/temp_and_humidity_${id}.txt`,
          `${req.body.sensordatavalues[2].value}\n${req.body.sensordatavalues[4].value}`,
          err => {
            console.log("Temperature and humidity saved");
          }
        );
        fs.writeFile(
          `${argv.path}/pressure_${id}.txt`,
          `${Math.round((req.body.sensordatavalues[3].value + Number.EPSILON)) / 100}`,
          err => {
            console.log("Pressure saved");
          }
        );
    })
    
    app.listen(port)

}


