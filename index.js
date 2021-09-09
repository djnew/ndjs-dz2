const readline = require('readline');
const yargs = require('yargs/yargs');
const GameLog = require('./file');

const {hideBin} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('log',{
    alias: 'l',
    describe: 'path to log file from project root (accepts only the filename, saves in csv format)'
  })
  .argv;
const saveLog = typeof argv.log === 'string';
const log = new GameLog(saveLog, argv.log.toString());

let randomNumber = Math.round(Math.random() + 1);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
});
console.log('Игра "Орел или решка"');
console.log('"close" - закрывает игру');
if(!saveLog){
  console.log('Лог не сохраняется, отсутствует параметр запуска, либо не является строкой');
}
console.log('Угадай число 1 или 2');

rl.prompt();
rl.on('line', (line) => {
  if(line.trim() === 'close'){
    rl.close();
    process.exit(1);
  }
  const parseLine = parseInt(line.trim());
  switch (parseLine) {
    case 1:
    case 2:
      log.saveLog(randomNumber, parseLine);
      console.log(`Вы ${parseLine === randomNumber ? 'Выиграли' : 'Проиграли'}`);
      console.log('Угадай число 1 или 2');
      randomNumber = Math.round(Math.random() + 1);
      break;
    default:
      console.log('Вводите только числа 1 или 2!');
      break;
  }
  rl.prompt();
});
