const fs = require('fs');
var list = [];
let read = false;
function readData(){
  if(!read){}
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
}


module.exports = function(difficult){
  readData('some_path', function(data) {
    if(!difficult) difficult = Math.floor(Math.random()*list.length);
    let li = list[difficult];
    console.log(li)
    return li[Math.floor(Math.random()*li.length)];
    } );
}