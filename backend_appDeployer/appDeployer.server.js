var express = require('express');
var app = express();


//==================================================
var listeningPort = process.env.PORT || 5100;
app.listen(listeningPort, function() {
  console.info("Node server listening on ", listeningPort);
});


