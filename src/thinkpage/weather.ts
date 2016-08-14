/// <reference path="../../typings/index.d.ts" />
"use strict";
import {uid, key} from "./configuration";
import { response_wrapper, response_daily, response_now } from "./M";
var https = require("https");
const url = require("url");

export namespace weather {

	// /**
	//  * 设定返回城市平均值或各监测站监测值
	//  */
	// enum scope {
	// 	city,	// 只返回城市平均值, default
	// 	all		// 返回城市平均值和各监测站监测值
	// }

	/**
	 * 获取指定城市未来最多15天的每日白天和夜间预报，以及昨天的历史数据。
	 */
	export var daily = (location: string): Promise<any> => {
		if (location.trim().length === 0)
			return new Promise<string>((resolve, reject) => {
				reject("location is required");
			});
		return new Promise<response_wrapper<response_daily>>((resolve, reject) => {
			let url = `https://api.thinkpage.cn/v3/weather/daily.json?key=${key}&location=${location}`;
			let opts = _getHttpsRequestOptionsByURL(url); 
			https.request(opts, res => {
				let html = '';
				console.log(`${url} => ${res.statusCode}`);
				res.on("data", data => html+= data);
				res.on("end",()=>{
					let json = JSON.parse(html);
					resolve(json);
				});
			}).on("error", (err: any) => reject(err)).end();
		});
	}

	/**
	 * 获取指定城市的实况天气。
	 */
	export var now = (location: string): Promise<any> => {
		if (location.trim().length === 0)
			return new Promise<string>((resolve, reject) => {
				reject("location is required");
			});
		return new Promise<response_wrapper<response_now>>((resolve, reject) => {
			let url = `https://api.thinkpage.cn/v3/weather/now.json?key=${key}&location=${location}`;
			let opts = _getHttpsRequestOptionsByURL(url); 
			https.request(opts, res => {
				let html = '';
				console.log(`${url} => ${res.statusCode}`);
				res.on("data", data => html+= data);
				res.on("end",()=>{
					let json = JSON.parse(html);
					resolve(json);
				});
			}).on("error", (err: any) => reject(err)).end();
		});
	}
	const _getHttpsRequestOptionsByURL = (() => {
		var options = {
			hostname: 'api.thinkpage.cn',
			port: 443,
			path: '/',
			method: 'GET'
		};
		return (urlStr: string) => {
			let uri = url.parse(urlStr);
			options.path = uri.path;
			return options;
		};
	})();
}