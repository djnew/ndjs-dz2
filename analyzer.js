const fs = require('fs');
const {access} = require('fs/promises');
const yargs = require('yargs/yargs');
const {hideBin} = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('log', {
    alias: 'l',
    describe: 'path to log file from project root (accepts only the filename, saves in csv format)',
  })
  .argv;

async function analyzeFile(logFile = 'log'){
  try {
    await access(`${logFile}.csv`);
  }catch (e){
    console.error('Файл не существует');
    process.exit(0);
  }

  const readStream = fs.createReadStream(`${logFile}.csv`, {
    flags: 'r',
    encoding: 'UTF-8',
  });

  let wins = 0;
  let tmpColumns = [];
  let rounds = 0;
  readStream.on('data', (chunk) => {
    const bufferString = chunk.toString();
    const rows = bufferString.split('\n');
    for (let rowNum = 0; rowNum < rows.length; rowNum++) {
      let columns = rows[rowNum].trim().split(';');
      columns = columns.filter(element => element);
      if (columns.length < 3) {
        rounds--;
        tmpColumns = [...tmpColumns, ...columns];
      } else if (tmpColumns && tmpColumns.length === 3) {
        console.log('test', tmpColumns);
        rounds++;
        columns = tmpColumns;
        console.log(columns);
        tmpColumns = [];
      }
      if (columns.length === 3) {
        wins += parseInt(columns[2]);
      }
    }
    rounds += rows.length;
  });

  readStream.on('end', () => {
    console.log(`Количество выигрышей: ${wins}`);
    console.log(`Количество проигрышей: ${rounds-wins}`);
    console.log(`Количество партий: ${rounds}`);
    console.log(`Процент выигрышей: ${(wins * 100 / rounds).toFixed(2)}%`);
  });

}

analyzeFile(argv.log)
