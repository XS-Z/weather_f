
*This repo is only for learning*.

**How it works**

Fetch weather data by calling [thinkpage API](http://www.thinkpage.cn/api), combine real time data with next few days forecast data together, then send it slack channel via slackbot.

To get weather data daily, you can schedule a task on your PC that run `node slack_weather_forecaster.js [city]` daily.

**Limitation**

Due to thinkpage API personal account limitation, now can only get real time weather data and up to 3 days forecast data of specific cities.

**Technology stack / Tag**

`NodeJS` `TypeScript` `thinkpage API` `slack` `[node slack sdk](https://github.com/slackhq/node-slack-sdk/)`
