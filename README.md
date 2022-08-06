# DiceBot

A Discord Dice bot written using NodeJS and a module called "Discord.JS".

## This bot can:
* Roll a complex set of dice
* Have numerous modifiers for said dice e.g. double final result
* Save user's dice rolls under an alias
* Generate D&D stats and other numerous D&D functions
* Numerous utility bot functions e.g. change command prefixes

To add this bot to your own Discord server, click [here](https://discord.com/api/oauth2/authorize?client_id=774637611482349578&permissions=3072&scope=bot).

## Running Locally

### First Time Setup
In order to run this bot locally, you will need a Discord bot token, which you can generate yourself [here](https://discord.com/developers/applications). Copy and paste this token into the 'token' field of the [`app.json.sample`](config/app.json.sample) file and rename the file to remove the '.sample', leaving you with `app.json`. The other fields are optional.

Next, you will have to install the dependencies through npm. Open a terminal window within this directory and type `npm install`.

### Starting
Once the above has been completed, to start the bot simply run `run.bat` or open a terminal window within this directory and type `node ./src/index.js`.