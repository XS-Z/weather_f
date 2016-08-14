/// <reference path="../../typings/index.d.ts" />
"use strict";
import {uid, key} from "./configuration";
import { response_wrapper, response_suggestion } from "./M";
var https = require("https");

export namespace life{
	/**
	 * 获取指定城市的基本、交通、生活、运动、健康5大类共27项生活指数。目前仅支持中国城市。

	 * 基本类：穿衣、紫外线强度、洗车、旅游、感冒、运动

	 * 交通类：交通、路况

	 * 生活类：晾晒、雨伞、空调开启、啤酒、逛街、夜生活、约会

	 * 运动类：晨练、钓鱼、划船、放风筝

	 * 健康类：过敏、美发、化妆、风寒、防晒、空气污染扩散条件、舒适度、心情
	 */
	export var suggestion = (location: string): Promise<any> => {
		if (location.trim().length === 0)
			return new Promise<string>((resolve, reject) => {
				reject("location is required");
			});
		return new Promise<response_wrapper<response_suggestion>>((resolve, reject) => {
			let url = `https://api.thinkpage.cn/v3/life/suggestion.json?key=${key}&location=${location}`;
			https.get(url, (err: Error, data: any) => {
				if (err) reject(err);
				if (typeof data === "string") data = JSON.parse(data);
				resolve(data);
			}).on("error", (err: any) => reject(err));
		});
	}
}