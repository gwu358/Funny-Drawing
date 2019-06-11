const fs = require('fs');
var list = []

fs.readFile('./easy.txt', 'utf8', function(error, data){
  list[0] = data.split('\n');
})

fs.readFile('./medium.txt', 'utf8', function(error, data){
  list[1] = data.split('\n');
})

fs.readFile('./hard.txt', 'utf8', function(error, data){
  list[2] = data.split('\n');
})

fs.readFile('./veryHard.txt', 'utf8', function(error, data){
  list[3] = data.split('\n');
})

module.export = function(difficult){
  if(!difficult) difficult = Math.floor(Math.random()*list.length);
  let li = list[difficult];
  return li[Math.floor(Math.random()*li.length)];
}