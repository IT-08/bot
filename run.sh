#!/bin/bash

sleep 5
./node_modules/.bin/sequelize db:migrate
/usr/local/bin/node bot.js
