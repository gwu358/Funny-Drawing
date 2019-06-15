const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
var list = [];
let read = false;
async function readData(){ 
  if(read) return;
  list[0] = (await readFile('./easy.txt')).toString().split('\n')
  list[1] = (await readFile('./medium.txt')).toString().split('\n')
  list[2] = (await readFile('./hard.txt')).toString().split('\n')
  list[3] = (await readFile('./veryHard.txt')).toString().split('\n')
  read = true;
}


module.exports = function(difficult){
  return readData().then((data) => {
    if(isNaN(difficult)) difficult = Math.floor(Math.random()*list.length);
    let li = list[difficult];
    return li[Math.floor(Math.random()*li.length)];
  })
}