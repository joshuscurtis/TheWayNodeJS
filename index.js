  
const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var app = express();

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});


var auth;
var auth1;


function createBody(orderNum,products){
    body = {"order_id": "0000","products":[{"quantity":"1","productUuid":"f7e60750-3c4c-11ea-8904-8bc74c688db4","variantUuid":"f7e62e60-3c4c-11ea-8904-8bc74c688db4","vatPercentage":0,"unitPrice":0,"rowTaxableAmount":0,"name":"Take Away","description":"","variantName":"","autoGenerated":false,"id":"0","type":"PRODUCT","libraryProduct":true},{"quantity":"3","productUuid":"5b3518e0-3c53-11ea-aeb9-9304bbabbcff","variantUuid":"29559f40-3f67-11ea-b68e-d872fe59a498","vatPercentage":0,"unitPrice":180,"rowTaxableAmount":540,"name":"Latte","description":"","variantName":"","autoGenerated":false,"id":"1","type":"PRODUCT","libraryProduct":true},{"quantity":"1","productUuid":"9d9e2280-3c53-11ea-92b0-36c9f69b5c55","variantUuid":"9d9ee5d0-3c53-11ea-9c5a-55e770000ad6","vatPercentage":0,"unitPrice":180,"rowTaxableAmount":180,"name":"Cappuccino","description":"","variantName":"","autoGenerated":false,"id":"2","type":"PRODUCT","libraryProduct":true}]}

    body.order_id = orderNum;
    body.products = products
    return JSON.stringify(body);
    }
    
function postDB(orderNum,products) {
    reqBody = createBody(orderNum, products);
    var postSettings = {
                "url": "https://mydbrestservice.herokuapp.com/orders",
                "method": "POST",
                "timeout": 0,
                "headers": {"content-type": "application/json"},
                "data" : reqBody
            }
    request(postSettings, function (error, response) {
        if (error) throw new Error(error);
        console.log("DBPOST: "+response.body);
    });
}

var request = require('request');
var options = {
  'method': 'POST',
  'url': 'https://mycorsprox.herokuapp.com/https://oauth.izettle.com/token',
  'headers': {
    'X-Requested-With': '*',
    'Origin': 'null',
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  form: {
    'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    'client_id': 'a0a378da-a98c-11ea-91ee-01dae521f2fa',
    'assertion': 'eyJraWQiOiIwIiwidHlwIjoiSldUIiwiYWxnIjoiUlMyNTYifQ.eyJpc3MiOiJpWmV0dGxlIiwiYXVkIjoiQVBJIiwiZXhwIjoyNTM4MzMwOTgwLCJzdWIiOiI0MjQzNjNkZS0zNmMwLTExZWEtYjNkYi1iMzAwN2NjNDc0ZTMiLCJpYXQiOjE1OTE2MjMyMDQsInJlbmV3ZWQiOmZhbHNlLCJzY29wZSI6WyJXUklURTpQQVlNRU5UIiwiUkVBRDpQUk9EVUNUIiwiUkVBRDpQVVJDSEFTRSIsIlJFQUQ6Q1VTVE9NRVIiLCJSRUFEOlBBWU1FTlQiLCJXUklURTpGSU5BTkNFIiwiV1JJVEU6UkVGVU5EMiIsIlJFQUQ6VVNFUklORk8iLCJXUklURTpQVVJDSEFTRSIsIldSSVRFOkNVU1RPTUVSIiwiV1JJVEU6T05MSU5FUEFZTUVOVCIsIlJFQUQ6RklOQU5DRSIsIldSSVRFOlBST0RVQ1QiLCJXUklURTpVU0VSSU5GTyIsIldSSVRFOlJFRlVORCIsIlJFQUQ6T05MSU5FUEFZTUVOVCJdLCJ1c2VyIjp7InVzZXJUeXBlIjoiVVNFUiIsInV1aWQiOiI0MjQzNjNkZS0zNmMwLTExZWEtYjNkYi1iMzAwN2NjNDc0ZTMiLCJvcmdVdWlkIjoiNDI0MWIzZjQtMzZjMC0xMWVhLTg5ZjEtMDRmZGFiN2FkMjhmIiwidXNlclJvbGUiOiJPV05FUiJ9LCJ0eXBlIjoidXNlci1hc3NlcnRpb24iLCJjbGllbnRfaWQiOiJhMGEzNzhkYS1hOThjLTExZWEtOTFlZS0wMWRhZTUyMWYyZmEifQ.rC8gc5LHSA4u1l2n2K0pOzMtdLRtzJQQCriAexOtlpKJyQxcj0uTKqYySscMXGg3mqbnHSrARCdbFsZXdj6JQ7CO4-BpP_WO_n0Mrd4RvrrJ6ooGS-uO6TMsTkEJrY_JpJVyMAm_G2rB6_vZsqjgg4btBlCT4n4hvznpgRrX2_eOElXGWmkV0BaaTkxBsQedttU_ZP14NCVQ85W6tMvtndD5J5k5nme45a5oo8Mj_FoCOciQG4g4JUhL4kcKcT0dO7jJYKsrQVa9uk5D24ieVQF8vsjmjTkIt8vacJzPtntW9y3wyQV4IojH29yxKUzJsJDRCbBLTBn7JGJCI2CCqg',
    '': ''
  }
};

request(options, function (error, response) {
    if (error) throw new Error(error);

    auth = JSON.parse(response.body);
    auth = JSON.stringify(auth.access_token);
    auth = auth.substring(1, auth.length-1);
    auth = 'Bearer ' + auth

    var options1 = {
            'url': "https://purchase.izettle.com/purchases/v2?limit=1&descending=true",
            'method': "GET",
            'timeout': 0,
            'headers': {
                "content-type": "application/json",
                'Authorization': auth
            }
        }

    request(options1, function (error, response) {
        if (error) throw new Error(error);
        auth1 = response.body;
        console.log(auth1);
        auth1 = JSON.parse(auth1);
        newBody = createBody(auth1.purchases[0].globalPurchaseNumber,auth1.purchases[0].products);
        postDB(auth1.purchases[0].globalPurchaseNumber,auth1.purchases[0].products);
    });
});








express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/table', (req, res) => res.render('pages/table'))
  .get('/data', (req, res) => res.render('pages/table', {arequest: newBody}))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
