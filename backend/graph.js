var fetch = require('node-fetch')
class Graph{
	constructor(accessToken){
		this.accessToken = accessToken
	}

	api = (api , config) => {
		let headers = {
			...config.headers,
			"Authorization": this.accessToken
		}
		let body = config.body
		let method = config.method
		return fetch(process.env.MS_GRAPH + api, {method: method, headers : headers, body: body})
	}
}

module.exports = Graph