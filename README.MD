Версия NodeJS 14.17.1

Пакетный менеджер Yarn

запуск eslint:
```shell
$ yarn lint
yarn run v1.22.5
$ eslint --ext ".js" --ignore-path .gitignore .
Done in 0.50s.

```

# 1 задание
файл [index.js](index.js)

лог файл: [log.csv](log.csv)
Запуск:
```shell
$ node .\index.js --help
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -l, --log      path to log file from project root (accepts only the name, save
                 csv file)
```
```shell
$ node .\index.js -l log
Игра "Орел или решка"
"close" - закрывает игру
Угадай число 1 или 2
> 1
Вы Проиграли
Угадай число 1 или 2
> 2
Вы Проиграли
Угадай число 1 или 2
> 1
Вы Проиграли
Угадай число 1 или 2
> 2
Вы Выиграли
Угадай число 1 или 2
> close
```
```shell
$ node .\index.js -l
Игра "Орел или решка"
"close" - закрывает игру
Лог не сохраняется, отсутствует параметр запуска, либо не является строкой
Угадай число 1 или 2
> 1
Вы Проиграли
Угадай число 1 или 2
> 2
Вы Выиграли
Угадай число 1 или 2
> 2
Вы Проиграли
Угадай число 1 или 2
> close
```

# 2 задание
файл [analyzer.js](analyzer.js) без параметров читает файл log.csv

лог файл: [log.csv](log.csv)
Запуск:
```shell
$ node .\analyzer.js --help
Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -l, --log      path to log file from project root (accepts only the filename,
                 saves in csv format)

```
```shell
$ node .\analyzer.js
Количество выигрышей: 779
Количество проигрышей: 266
Количество партий: 1045
Процент выигрышей: 74.55%
```

```shell
$ node .\analyzer.js -l test
Файл не существует
```

```shell
$ node .\analyzer.js -l
Файл не существует
```
