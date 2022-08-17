async function sleep(ms) {
    await new Promise(r => setTimeout(r, ms));
    }

    async function unixTime(){
        return parseInt(new Date().getTime()/1000)
        }

		function compareShares(a, b)
		{
			if(a.shares >= b.shares)
			{
				return -1;
			}
			else{
				return 1;
			}
		}
		
async function isJsonString(str) {
    try {
        let json_array = JSON.parse(str);
    return {approve: true, data: json_array};
    } catch (e) {
        return {approve: false};
    }
}

async function getRandomInRange(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	async function generateRandomCode(length)
	{
			charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
			retVal = "";
		for (var i = 0, n = charset.length; i < length; ++i) {
			retVal += charset.charAt(Math.floor(Math.random() * n));
		}
		return retVal;
	}
	

	async function objectSearch(object, value) {
		let results = -1;
        for (let key in object) {
if (object[key] === value) {
    results += 1;
}
}
return results;
}

async function stringToHash(string) {
	string += 'user_id_mg_bot';
	                var hash = 0;
	                if (string.length == 0) return hash;
	                for (i = 0; i < string.length; i++) {
	                    char = string.charCodeAt(i);
	                    hash = ((hash << 5) - hash) + char;
	                    hash = hash & hash;
	                }
	                return hash;
	            }

	async function remove_array(array, value) {
		return Array.prototype.remove = function(value) {
			var idx = this.indexOf(value);
			if (idx != -1) {
				// Второй параметр - число элементов, которые необходимо удалить
				return this.splice(idx, 1);
			}
			return false;
		}
		}
		
		async function date_str(timestamp,add_time,add_seconds,remove_today=false){
			if(-1==timestamp){
				var d=new Date();
			}
			else{
				var d=new Date(timestamp);
			}
			var day=d.getDate();
			if(day<10){
				day='0'+day;
			}
			var month=d.getMonth()+1;
			if(month<10){
				month='0'+month;
			}
			var minutes=d.getMinutes();
			if(minutes<10){
				minutes='0'+minutes;
			}
			var hours=d.getHours();
			if(hours<10){
				hours='0'+hours;
			}
			var seconds=d.getSeconds();
			if(seconds<10){
				seconds='0'+seconds;
			}
			var datetime_str=day+'.'+month+'.'+d.getFullYear();
			if(add_time){
				datetime_str=datetime_str+' '+hours+':'+minutes;
				if(add_seconds){
					datetime_str=datetime_str+':'+seconds;
				}
			}
			if(remove_today){
				datetime_str= await fast_str_replace(date_str(-1)+' ','',datetime_str);
			}
			return datetime_str;
		}
		
		async function fast_str_replace(search,replace,str){
			return str.split(search).join(replace);
		}

		async function nowDateTime() {
			var tm = new Date();
			var resTxt = "Обновлено " + tm.getDate() + "." + (tm.getMonth() + 1)
				   + "." + tm.getFullYear() + ", " + 
		tm.getHours() + ":"
				   + tm.getMinutes() + ":" + tm.getSeconds() + " GMT+3";
			
			return resTxt;
		}

		const { stringify } = require("querystring");

		var getModules = function() {
let dir = __dirname + '/modules';
	
			var filesystem = require("fs");
			var results;
			filesystem.readdirSync(dir).forEach(function(file) {
		
				let filePass = dir+'/'+file;
				var stat = filesystem.statSync(filePass);
		
				if (stat && stat.isDirectory()) {
					if (typeof results === 'undefined') results = {};
					results[file] = _getAllFilesFromFolder(filePass);
				} else {
		if (typeof results === 'undefined') results = [];
					results.push(file);
				}
			});
			return results;
		};

module.exports.unixTime = unixTime;
module.exports.sleep = sleep;
module.exports.compareShares = compareShares;
module.exports.getRandomInRange = getRandomInRange;
module.exports.isJsonString = isJsonString;
module.exports.generateRandomCode = generateRandomCode;
module.exports.objectSearch = objectSearch;
module.exports.stringToHash = stringToHash;
module.exports.remove_array = remove_array;
module.exports.date_str = date_str;
module.exports.nowDateTime = nowDateTime;
module.exports.getModules = getModules;