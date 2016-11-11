var app = require("express")()
var http = require('http').Server(app)
var io = require('socket.io')(http)
var Twit = require("twit")

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

var twitter = new Twit({
  consumer_key:         'xjWLObruAB3xvEupMSR7cWgm9',
  consumer_secret:      'J1TbDWvLprwGAUgjixctThow7WPzoyD184ZCcuRTH4BRBVM8bu',
  access_token:         '732636120970731520-ayg0jVn6DB9KIGmhTeWkYdywxILlaA6',
  access_token_secret:  'Ltelv1aJWeg4WsrqT4XB5qup1U2WbARiL4oLd62pLtsja',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

io.on('connection', socket => {
  socket.on('tweets', tweets => {
    twitter.get('search/tweets', { q: 'silver lining since:2016-011-06 exclude:retweets', count: 50 }, function(err, data, response) {
      let tweets = []
      for (let i = 0; i < data.statuses.length; i++){
        tweets.push(data.statuses[i].text)
      }
      io.emit('tweets', tweets)
    })
  })
})

http.listen(4300, () => {
  console.log("Runnin'");
})
