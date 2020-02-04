#!/bin/bash

sleep 10
./node_modules/.bin/sequelize db:migrate
/usr/local/bin/node bot.js
