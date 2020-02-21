const fs = require("fs")



const writeToFile = (path, data, type) => {
  fs.writeFile(path, data, err => {
      if(err) {
        console.log(`Error saving ${type}`)
        return 0;
      }
      else{
        console.log(`${type} saved`);
        return 1;
      }
    }
  );
}





module.exports = writeToFile
