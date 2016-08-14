/// models
export class location{
	constructor(
		public id:string, 
		public name:string, 
		public country:string,
		public path:string,
		public timezone:string,
		public timezone_offset:string
		){}
}
class response_common{
	constructor(
		location:location, 
		last_update:string	//数据更新时间（该城市的本地时间）
		){}
}

class daily_data{
	constructor(
		date: string,			//日期
		text_day: string,		//白天天气现象文字
		code_day: string,		//白天天气现象代码
		text_night: string,		//晚间天气现象文字
		code_night: string,		//晚间天气现象代码
		high: string,			//当天最高温度
		low: string,			//当天最低温度
		precip: string,			//降水概率，范围0~100，单位百分比
		wind_direction: string,	//风向文字
		wind_direction_degree: string,	//风向角度，范围0~360
		wind_speed: string,		//风速，单位km/h（当unit=c时）、mph（当unit=f时）
		wind_scale: string		//风力等级
		){}
}
/// data struct for daily response
export class response_daily extends response_common{
	constructor(
		location: location, 
		last_update:string,
		daily: daily_data[]	//返回指定days天数的结果
		){
		super(location, last_update);
	}
}

class now_data{
	constructor(
		text: string,					//天气现象文字
		code: string,					//天气现象代码
		temperature: string,			//温度，单位为c摄氏度或f华氏度
		feels_like: string,				//体感温度，单位为c摄氏度或f华氏度
		pressure: string,				//气压，单位为mb百帕或in英寸
		humidity: string,				//相对湿度，0~100，单位为百分比
		visibility: string,				//能见度，单位为km公里或mi英里
		wind_direction: string,			//风向文字
		wind_direction_degree: string,	//风向角度，范围0~360，0为正北，90为正东，180为正南，270为正西
		wind_speed: string,				//风速，单位为km/h公里每小时或mph英里每小时
		wind_scale: string,				//风力等级，请参考：http://baike.baidu.com/view/465076.htm
		clouds: string,					//云量，范围0~100，天空被云覆盖的百分比
		dew_point: string				//露点温度，请参考：http://baike.baidu.com/view/118348.htm
	){}
}

export class response_now extends response_common{
	constructor(
		location: location, 
		last_update:string,
		now: now_data
		){
		super(location, last_update);
	}
}

class suggestion_data{
	constructor(
		ac: suggestion_data_item, 				//空调开启
		air_pollution: suggestion_data_item,	//空气污染扩散条件
		airing: suggestion_data_item,			//晾晒
		allergy: suggestion_data_item,			//过敏
		beer: suggestion_data_item,				//啤酒
		boating: suggestion_data_item,			//划船
		car_washing: suggestion_data_item,		//洗车
		chill: suggestion_data_item,			//风寒
		comfort: suggestion_data_item,			//舒适度
		dating: suggestion_data_item,			//约会
		dressing: suggestion_data_item,			//穿衣
		fishing: suggestion_data_item,			//钓鱼
		flu: suggestion_data_item,				//感冒
		hair_dressing: suggestion_data_item,	//美发
		kiteflying: suggestion_data_item,		//放风筝
		makeup: suggestion_data_item,			//化妆
		mood: suggestion_data_item,				//心情
		morning_sport: suggestion_data_item,	//晨练
		night_life: suggestion_data_item,		//夜生活
		road_condition: suggestion_data_item,	//路况
		shopping: suggestion_data_item,			//购物
		sport: suggestion_data_item,			//运动
		sunscreen: suggestion_data_item,		//防晒
		traffic: suggestion_data_item,			//交通
		travel: suggestion_data_item,			//旅游
		umbrella: suggestion_data_item,			//雨伞
		uv: suggestion_data_item				//紫外线
		){}
}

class suggestion_data_item{
	constructor(brief:string, details:string){}
}

export class response_suggestion extends response_common{
	constructor(
		location: location, 
		last_update:string,
		suggestion: suggestion_data
		){
		super(location, last_update);
	}
}
export class response_search {
	constructor(location: location){}
}
export class response_wrapper<response_common>{
	constructor(public results:response_common[]){}
}