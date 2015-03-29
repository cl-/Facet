theBraintreeMerchantId = "m87zkj8zks2jt2dj";
theBraintreePublicKey = "vtqmxsf8hsqkm6yx";
theBraintreePrivateKey = "def3490ef4046b36b6699331352ac4f3";
aBraintreeCustomerId = 0;

var express = require('express');
var app = express();

var braintree = require('braintree');
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: theBraintreeMerchantId,
  publicKey: theBraintreePublicKey,
  privateKey: theBraintreePrivateKey
});

//Enable CORS
//http://enable-cors.org/server_expressjs.html
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// app.get('/', function(req, res, next) {
//   // Handle the get for this route
// });
// app.post('/', function(req, res, next) {
//  // Handle the post for this route
// });

app.get("/braintree_clientToken", function (req, res) {
  gateway.clientToken.generate({
    //customerId: aBraintreeCustomerId
  }, function (err, response) {
    var clientToken = response.clientToken;
    console.info("Generated Braintree clientToken."); //console.info("Generated Braintree clientToken.", clientToken);
    res.send(response);
    console.info("Sent Braintree clientToken as response.");
  });
});

app.post("/braintree_purchase", function (req, res) {
  var nonce = req.body.payment_method_nonce;
  // Use payment method nonce here
  console.info("Received Braintree nonce.", req.body);
  gateway.transaction.sale({
    amount: '10.00',
    paymentMethodNonce: 'nonce-from-the-client',
  }, function (err, result) {
    console.info("Completed Braintree purchase transaction.", result.success);
    if (result.success) { res.json(200,{success:true});  }
    else                { res.json(401,{success:false}); }
  });
});

//==================================================
var listeningPort = process.env.PORT || 5200;
app.listen(listeningPort, function() {
  console.info("Node server listening on ", listeningPort);
});


