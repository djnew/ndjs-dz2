const fs = require('fs');
const path = require('path');

class GameLog {
  constructor(needSave = true,name) {
    this.needSave = needSave;
    this.filename = name;
    this.extension = 'csv';
    this.path = path.parse(path.join(__dirname, name))
    this.fileExists();
  }

  fileExists() {
    if(!this.needSave){
      return;
    }
    fs.access(`${this.filename}.${this.extension}`, async (error) => {
      if(error){
        try {
          await fs.promises.mkdir(this.path.dir, {recursive: true})
          const bom = '\ufeff';
          await fs.promises.writeFile(`${this.filename}.${this.extension}`, bom, {encoding: 'utf8'});
        }catch (error) {
          if (error) throw error;
        }
      }
    });
  }

  saveLog(gameNumber, userNumber) {
    if(!this.needSave){
      return;
    }
    const row = `${gameNumber};${userNumber};${gameNumber === userNumber ? 1 : 0}\n`;
    fs.appendFile(`${this.filename}.${this.extension}`, row, { encoding: 'utf8' },(error) => {
      if (error) throw error;
    });

  }
}

module.exports = GameLog;
