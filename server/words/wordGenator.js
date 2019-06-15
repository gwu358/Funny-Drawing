const fs = require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
var list = [];
let read = false;
async function readData(){ 
  if(read) return;
  try{
    list[0] = (await readFile(__dirname + '/easy.txt')).toString().split('\n')
    list[1] = (await readFile(__dirname + '/medium.txt')).toString().split('\n')
    list[2] = (await readFile(__dirname + '/hard.txt')).toString().split('\n')
    list[3] = (await readFile(__dirname + '/veryHard.txt')).toString().split('\n')
  }
    catch(err){
      list = [[],[],[],[]];
      console.error(err);
    }
  read = true;
}


module.exports = function(difficult){
  return readData().then((data) => {
    if(isNaN(difficult) || difficult === '') difficult = Math.floor(Math.random()*list.length);
    let li = list[difficult];
    return li[Math.floor(Math.random()*li.length)];
  })
}