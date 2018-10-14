var hdb = require('hdb');
var emojiStrip = require('emoji-strip');

var Twitter = require('node-tweet-stream')
  , t = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    token: '',
    token_secret: ''
  });

var hdb = hdb.createClient({
        host     : 'localhost',
        port     : 30015,
        user     : 'DEV01',
        password : process.argv[2] // from command line
});

hdb.connect(function (err) {
        if (err) {
                return console.error('HDB connect error:', err);
        }
});


t.on('tweet', function(tweet){
// console.log("Received tweet:" ,tweet);
                     if (typeof tweet.id_str !== 'undefined') {
                          var myDate = new Date(Date.parse(tweet.created_at.replace(/( +)/, 'UTC$1')));
                          var createdAt = myDate.getFullYear() + '-' + eval(myDate.getMonth()+1) + '-' + myDate.getDate() + ' ' + myDate.getHours() + ':' + myDate.getMinutes() + ':' + myDate.getSeconds();
                          var replyUser = '';
                                                if (tweet.in_reply_to_screen_name !== null) {
                                                        replyUser = tweet.in_reply_to_screen_name
                                                }
                                                var retweetedUser = '';
                                                if (typeof tweet.retweeted_status !== 'undefined') {
                                                        retweetedUser = tweet.retweeted_status.user.screen_name;
                                                }
                                                var lat = null;
                                                var lon = null;
                                                if (tweet.geo !== null) {
                                                        lat = tweet.geo.coordinates[0];
                                                        lon = tweet.geo.coordinates[1];
                                                }
                                                console.log('Tweet:', tweet.id_str, tweet.lang, createdAt, tweet.user.screen_name, tweet.text, replyUser, retweetedUser, lat, lon);
                                                var sql = 'INSERT INTO "Tweets" ("id","created","text","lang","user","replyUser","retweetedUser"';
                                                if (tweet.geo !== null) {
                                                        sql += ',"lat","lon"';
                                                }
                                                sql += ') VALUES(\'' + tweet.id_str + '\',\'' + createdAt + '\',\'' + emojiStrip(tweet.text.replace(/\'/g," ")) + '\',\'' + tweet.lang + '\',\'' + tweet.user.screen_name + '\',\'' + replyUser + '\',\'' + retweetedUser + '\'';
                                                if (tweet.geo !== null) {
                                                        sql += ',' + lat + ',' + lon;
                                                }
                                                sql += ')';
                                                hdb.exec(sql, function(err, affectedRows){
                                                        if (err) {
                                                                console.log('Error:', err);
                                                                console.log('SQL:', sql);
                                                                return console.error('Error:', err);
                                                        }
                                                        console.log('Tweet inserted:', tweet.id_str, createdAt, affectedRows);
                                                });
                                        }
                                });

t.track('AravindhaSametha');
