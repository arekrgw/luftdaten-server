const express = require("express")
const app = express()
const argv = require("yargs").argv
const port = argv.port
const write = require("./src/writeFile")
app.use(express.json())
console.log("Init...")

if(!argv.path) {
    console.log("You have to provide path to destination folder")
}
else if(!argv.port){
    console.log("You have to provide port");
}
else if (argv.port > 65535 || argv.port < 1) {
    console.log("Your port number is invalid")
}
else{
    console.log(`Listening on port ${port}`)


    app.post("/sensor/:id", (req) => {
        let id = req.params.id ? req.params.id : Math.floor(Math.random() * (100000 - 1000 + 1) + 1000)
        const {sensordatavalues: sensData} = req.body.sensordatavalues ? req.body : []

        const airCondition = sensData
          .filter((val) => val.value_type == "SDS_P2" && val.value || val.value_type=="SDS_P1" && val.value)
          .map((val) => val.value)

        const tempAndOrHum = sensData
          .filter(
            val =>
              (val.value_type == "BME280_temperature" && val.value) ||
              (val.value_type == "BME280_humidity" && val.value)
          )
          .map(val => val.value);

        const pressure = sensData
          .filter(val => val.value_type == "BME280_pressure")
          .map(val => val.value);

        airCondition.length != 0 && write(`${argv.path}/air_condition_${id}.txt`, airCondition.join('\n'), "Air Condition")
        tempAndOrHum.length != 0 && write(`${argv.path}/temp_and_humidity_${id}.txt`, tempAndOrHum.join('\n'), "Temperature and/or humidity")
        pressure.length != 0 &&
          write(
            `${argv.path}/pressure_${id}.txt`,
            (Math.round(parseInt(pressure[0], 10) + Number.EPSILON) / 100)+198 * 0.113,
            "Pressure"
          );
        
    })
    
    app.listen(port)

}


