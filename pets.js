'use strict'
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];


Number.isInteger = Number.isInteger || function(value) {
  console.log('here');
  return typeof value === "number" &&
    isFinite(value) &&
    Math.floor(value) === value;
};


if (cmd === 'read') {

  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    // check for an index parameter
    var param1 = process.argv[3];
    if (param1) {
      if (param1 >= 0 && param1 < pets.length) {
        pets = pets[param1];
      } else {
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      }
    }
    console.log(pets);
  })
} else if (cmd === 'create') {
  var param1 = process.argv[3];
  var param2 = process.argv[4];
  var param3 = process.argv[5];
  if (param1 && param2 && param3 && isNormalInteger(param1)) {
    var pet = {}
    pet.age = param1;
    pet.kind = param2;
    pet.name = param3;

    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }
      var pets = JSON.parse(data);
      console.log(pets);
      pets.push(pet)
      console.log(pets);
      var petJSON = JSON.stringify(pets);
      fs.writeFile(petsPath, petJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
        console.log(pet)
      })
    });
  } else {
    console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
    process.exit(1);
  }





} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}

function isNormalInteger(str) {
    return /^(0|[1-9]\d*)$/.test(str);
}
