'use strict'
var fs = require('fs');
var path = require('path');
var petsPath = path.join(__dirname, 'pets.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var cmd = process.argv[2];

if (cmd === 'read') {
  readPet(process.argv[3]);
} else if (cmd === 'create') {
  createPet(process.argv[3], process.argv[4], process.argv[5]);
} else if (cmd === 'update') {
  updatePet(process.argv[3], process.argv[4], process.argv[5], process.argv[6]);
} else {
  console.error(`Usage: ${node} ${file} [read | create | update | destroy]`);
  process.exit(1);
}

function isNormalInteger(str) {
    return /^(0|[1-9]\d*)$/.test(str);
}

function readPet(index) {
  fs.readFile(petsPath, 'utf8', function(err, data) {
    if (err) {
      throw err;
    }
    var pets = JSON.parse(data);
    console.log('params:', index);
    if (index) {
      if (isNormalInteger(index) && param1 >= 0 && param1 < pets.length) {
        pets = pets[param1];
      } else {
        console.error(`Usage: ${node} ${file} read INDEX`);
        process.exit(1);
      }
    }
    console.log(pets);
  })
}

function createPet(age, kind, name) {
  if (age && kind && name && isNormalInteger(age)) {
    var pet = {}
    pet.age = age;
    pet.kind = kind;
    pet.name = name;
    fs.readFile(petsPath, 'utf8', function(readErr, data) {
      if (readErr) {
        throw readErr;
      }
      var pets = JSON.parse(data);
      pets.push(pet)
      var petsJSON = JSON.stringify(pets);
      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
      })
      console.log(pets);
    });
  } else {
    console.error(`Usage: ${node} ${file} create AGE KIND NAME`);
    process.exit(1);
  }
}

function updatePet(index, age, kind, name) {
  fs.readFile(petsPath, 'utf8', function(readErr, data) {
    if (readErr) {
      throw readErr;
    }
    var pets = JSON.parse(data);
    if (index && isNormalInteger(index) && index >= 0 && index < pets.length && age && isNormalInteger(age) && kind && name) {
      var pet = {}
      pet.age = age;
      pet.kind = kind;
      pet.name = name;
      pets[index] = pet
      var petsJSON = JSON.stringify(pets);
      fs.writeFile(petsPath, petsJSON, function(writeErr) {
        if (writeErr) {
          throw writeErr;
        }
      })
      console.log(pets);
    } else {
      console.error(`Usage: ${node} ${file} update INDEX AGE KIND NAME`);
      process.exit(1);
    }
  });
}
