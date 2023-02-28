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
In order to run this bot locally, you will need a Discord bot token, which you can generate yourself [here](https://discord.com/developers/applications). Replace `YOUR-TOKEN-HERE` within [`.env.sample`](.env.sample) with the token you have generated and eename this file to remove the '.sample', leaving you with a file named `.env`. The other fields within the `.env` file are optional.

Next, you will have to install the dependencies through npm. Open a terminal window within this directory and type `npm install`.

### Starting
Once the above has been completed, to start the bot open a terminal window within this directory and type `node start`.