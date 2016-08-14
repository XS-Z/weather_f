// "use strict";
const WebClient = require('@slack/client').WebClient;
const thinkpage = require("./src/thinkpage");

const token = "xoxb-69148985863-GN6KaGYrV32WWWH8iyyvYFSh"; // zxs-sharing.slack.com  weather bot
const channelId = "C213ZAHPH"; // #weather, can get the value from https://api.slack.com/methods/channels.list

const loc = process.argv[2] || 'shanghai';

const _log = data => console.log(JSON.stringify(data));
Promise.all([thinkpage.weather.now(loc), thinkpage.weather.daily(loc)]).then(responses => {
	// responses[0] now response, 	responses[1]    daily response,
	// perform some result translation work
	var now_resp = responses[0],
		daily_resp = responses[1];
	var webClient = new WebClient(token);
	var message = `天气预报 - <http://www.thinkpage.cn/|心知天气>`;
	var contents = [`${now_resp.results[0].now.text}  ${now_resp.results[0].now.temperature}℃`,
		daily_resp.results[0].daily.map(d => `${d.date}  ${d.text_day}  ${d.low}-${d.high}℃`).join('\n')
	];
	var opts = {
		"link_names": "Weather Forecast - bot",
		"attachments": [{
			"fallback": contents.join('\n'),
			"text": `${now_resp.results[0].location.name} - ${new Date(now_resp.results[0].last_update).toLocaleString("zh-CN")}`,
			"thumb_url": `http://www.thinkpage.cn/weather/images/icons/3d_50/${now_resp.results[0].now.code}.png`,
			"fields": [{
				"title": "实时天气",
				"value": contents[0],
				"short": true
			}, {
				"title": "未来 3 天天气",
				"value": contents[1],
				"short": true
			}],
			"color": "#764FA5"
		}]
	};

	webClient.chat.postMessage(channelId, message, opts, function(err, data) {
		if (err) throw err;
		_log(data);
		process.exit();
	});

}, err => {
	_log(err);
	process.exit(1);
});