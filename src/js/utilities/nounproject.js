var OAuth = require('oauth')


var KEY = "<INSERT KEY HERE>"
var SECRET = "<INSERT SECRET HERE>"

var oauth = new OAuth.OAuth(
	'http://api.thenounproject.com',
	'http://api.thenounproject.com',
	KEY,
	SECRET,
	'1.0',
	null,
	'HMAC-SHA1'
)
oauth.get(
	'http://api.thenounproject.com/icon/6324',
	null,
	null,
	function (e, data, res){
		if (e) console.error(e)
		console.log(require('util').inspect(data))
	}
)