var express = require('express');
var ParseServer = require('parse-server').ParseServer;
var ParseDashboard = require('parse-dashboard');
var path = require('path');
var app = express();
require('dotenv').config();

//create a parse server set up

const api = new ParseServer({
    databaseURI:'mongodb+srv://dreamvest16:dream_12345@cluster0.2cug7xx.mongodb.net/?retryWrites=true&w=majority&appName=AtlasApp',
    cloud:__dirname + '/cloud/main.js',
    appId:"ola_id",
    masterKey:"ola_master",
    serverURL:"http://localhost:1337/parse",
    liveQuery:{
      classNames:['Task',"Chat"]
    }
  
  })

  api.start();
  app.use('/parse',api.app)
  //dashboard
var options = { allowInsecureHTTP: false};

var dashboard = ParseDashboard(
    {
      apps: [
        {
          serverURL:"http://localhost:1337/parse",
          appId:"ola_id" ,
          masterKey:"ola_master",
          appName: 'Olatech-e-commerce'
        }
      ],
      users: [
        {
          user:"olayiwola" ,
          pass:"olayiwola"
        }
       
      ],
      trustProxy: 1
    },
    options
  );
  app.use('/dashboard', dashboard);

  // routing
app.get('/', (req, res) => {
    res.send('Parse Server is up again.');
  });
  app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/test.html'));
  });

  var port = process.env.PORT || 1337;
var httpServer = require('http').createServer(app);
httpServer.listen(port, () => {
  console.log('parse server is running on port ' + port);
});

// Live Query:
ParseServer.createLiveQueryServer(httpServer);