
<div align="center">
  <h1>frog-vibes</h1>
<span>
JS game led by <a href="https://www.claytaeto.com">Clay</a> in Apollo, Feb 14 -  Apr 11, 2021</span>
</div>

## Getting started

The packages needed to run frog vibes are distributed through npm, the node package manager.

Please install [nodejs](https://nodejs.org/en/) in order to begin


Confirm your installation by running this command in the terminal or powershell
``` 
npm --version
```
It should say somthing like "6.14.8" when you run that command. 

You can install all the dependancies by navigating to the project folder in a terminal and running this command

```
npm install
```

## Running the game

Use the terminal to navigate to the project folder and run this command to start the game 
```
npm start 
```
if the compile was successful, you can navigate to localhost:9000 in your browser to see the game!

## Useful Tools

This project uses eslint and webpack to help move things along. I recommend using [VSCode](https://code.visualstudio.com/) as an IDE because 1: it's free, 2: you can set it up to autofix a lot of problems

* [VSCode](https://code.visualstudio.com/)
* [EsLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [StyleLint plugin](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

A lot of problems can be autofixed in VSCode, I highly reccomend turning it on by adding this to your settings file
```
 "editor.codeActionsOnSave": {
        "source.fixAll": true
    }
```
