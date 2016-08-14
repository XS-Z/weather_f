/// <reference path="../../typings/index.d.ts" />
"use strict";
import {uid, key} from "./configuration";
import { response_wrapper, response_search } from "./M";
var https = require("https");

export namespace location{
	/**
	 * 根据城市ID、中文、英文、拼音、IP、经纬度搜索匹配的城市。
	 * 请求地址示例
	 * 用城市ID搜索https://api.thinkpage.cn/v3/location/search.json?key=lta8up2m7rdww2jw&q=WX4FBXXFKE4F
	 * 用城市中文搜索https://api.thinkpage.cn/v3/location/search.json?key=lta8up2m7rdww2jw&q=北京
	 * 用城市英文搜索https://api.thinkpage.cn/v3/location/search.json?key=lta8up2m7rdww2jw&q=beijing
	 * 用城市拼音缩写搜索https://api.thinkpage.cn/v3/location/search.json?key=lta8up2m7rdww2jw&q=bj
	 * 用IP地址搜索https://api.thinkpage.cn/v3/location/search.json?key=lta8up2m7rdww2jw&q=220.181.111.86
	 * 用经纬度搜索https://api.thinkpage.cn/v3/location/search.json?key=lta8up2m7rdww2jw&q=39.93:116.40
	 * 用省市名称限定搜索https://api.thinkpage.cn/v3/location/search.json?key=lta8up2m7rdww2jw&q=辽宁朝阳
	 * 搜索所有中英文名称中包含“san”的城市，返回第2页的10个结果https://api.thinkpage.cn/v3/location/search.json?key=lta8up2m7rdww2jw&q=san&limit=10&offset=10
	 */
	//export var search = (location: string, q:string, limit:number = 50, offset:number = 0): Promise<any> => {
	export var search = (location: string, q:string, limit:number, offset:number): Promise<any> => {
		if (location.trim().length === 0)
			return new Promise<string>((resolve, reject) => {
				reject("location is required");
			});
		if (q.trim().length === 0)
			return new Promise<string>((resolve, reject) => {
				reject("q(search term) is required");
			});
		if (limit == null) limit = 50;
		if (offset == null) offset = 0;
		return new Promise<response_wrapper<response_search>>((resolve, reject) => {
			let url = `https://api.thinkpage.cn/v3/locaion/search.json?key=${key}&q=${q}&limit=${limit}&offset=${offset}`;
			https.get(url, (err: Error, data: any) => {
				if (err) reject(err);
				if (typeof data === "string") data = JSON.parse(data);
				resolve(data);
			}).on("error", (err: any) => reject(err));
		});
	}
}