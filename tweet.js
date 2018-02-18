var OAuth2 = require('OAuth').OAuth2;
var https = require('https');

var oauth2 = new OAuth2("qKDmV0gXFjAejwY0xeQbcX6IE", "w8VMVBmq4YqTSdHyXc3dgULK7fC6p6J6OgzRjNzbgRPeWupARN", 'https://api.twitter.com/', null, 'oauth2/token', null);
oauth2.getOAuthAccessToken('', {
    'grant_type': 'client_credentials'
}, function (e, access_token) {
    console.log(access_token); //string that we can use to authenticate request

    var options = {
        hostname: 'api.twitter.com',
        path: '/1.1/statuses/user_timeline.json?screen_name=C9Mang0',
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    };


    https.get(options, function (result) {
        var buffer = '';
        result.setEncoding('utf8');
        result.on('data', function (data) {
            buffer += data;
        });
        result.on('end', function () {
            var tweets = JSON.parse(buffer);
            console.log(tweets); // the tweets!
        });
    });
});
