  
const express = require('express')
const path = require('path')	
const PORT = process.env.PORT || 5000	
const APIKEY = process.env.API
var app = express()
var http = require('http')

const basicAuth = require('express-basic-auth')



const server = require('http').createServer(app);
const options3 = { /* ... */ };
const io = require('socket.io')(server, options3);

io.on('connection', socket => { /* ... */ });

//server.listen( );






// Add headers
app.use(function(req, res, next) {
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

function createBody(orderNum, products) {
    body = {
        "order_id": "0000",
        "products": [{
            "quantity": "1",
            "productUuid": "f7e60750-3c4c-11ea-8904-8bc74c688db4",
            "variantUuid": "f7e62e60-3c4c-11ea-8904-8bc74c688db4",
            "vatPercentage": 0,
            "unitPrice": 0,
            "rowTaxableAmount": 0,
            "name": "Take Away",
            "description": "",
            "variantName": "",
            "autoGenerated": false,
            "id": "0",
            "type": "PRODUCT",
            "libraryProduct": true
        }, {
            "quantity": "3",
            "productUuid": "5b3518e0-3c53-11ea-aeb9-9304bbabbcff",
            "variantUuid": "29559f40-3f67-11ea-b68e-d872fe59a498",
            "vatPercentage": 0,
            "unitPrice": 180,
            "rowTaxableAmount": 540,
            "name": "Latte",
            "description": "",
            "variantName": "",
            "autoGenerated": false,
            "id": "1",
            "type": "PRODUCT",
            "libraryProduct": true
        }, {
            "quantity": "1",
            "productUuid": "9d9e2280-3c53-11ea-92b0-36c9f69b5c55",
            "variantUuid": "9d9ee5d0-3c53-11ea-9c5a-55e770000ad6",
            "vatPercentage": 0,
            "unitPrice": 180,
            "rowTaxableAmount": 180,
            "name": "Cappuccino",
            "description": "",
            "variantName": "",
            "autoGenerated": false,
            "id": "2",
            "type": "PRODUCT",
            "libraryProduct": true
        }]
    }

    body.order_id = orderNum;
    body.products = products;
	
    body.isnew = true;
    body.istable = doesOrderContainTable(products);
    body.isclosed = false;
    
    
    //console.log("createBody: " + JSON.stringify(body));
    return JSON.stringify(body);
}


function doesOrderContainTable(orderData) {
	if (orderData != null) {
    var itemsInOrder = orderData.length;
}
    var count = -1;
    var tableCheck = null;
    var tableOrder;
    for (var y = 0; y < itemsInOrder; y++) {
        var orderName = orderData[y].name.substring(0,5)
        if(orderName == "Table") {
            tableOrder = true;
            tableCheck = orderData[y].name;
            table = orderData[y].name;
            count = count + 1
        }
    }
    if(tableCheck == null) {tableOrder = false}
return tableOrder;
}


function postDB(orderNum, products) {
    reqBody = createBody(orderNum, products);
    //reqBody = reqBody.slice(9)
    //console.log("reqBody: " + reqBody)
    var postSettings = {
        'method': 'POST',
        'url': 'https://mydbrestservice.herokuapp.com/orders',
        'headers': {
            'Prefer': 'resolution=merge-duplicates',
            'Content-Type': 'application/json'
        },
        body: reqBody
    };
    //console.log("Settings: " + JSON.stringify(postSettings));
    request(postSettings, function(error, response) {
        if (error) throw new Error(error);
		console.log(error);
       // console.log("DBPOST: " + response.body);
    });
}

var request = require('request');
var options = {
    'method': 'POST',
    'url': 'https://oauth.izettle.com/token',
    'headers': {
        'X-Requested-With': '*',
        'Origin': 'null',
        'Content-Type': 'application/x-www-form-urlencoded'
    },
    form: {
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'client_id': 'f5cbac98-e2d4-11ea-8771-c3299c61a3e9',
        'assertion': APIKEY,
        '': ''
    }
};

setInterval(function() {
    request(options, function(error, response) {
        if (error) throw new Error(error);

        auth = JSON.parse(response.body);
        auth = JSON.stringify(auth.access_token);
        auth = auth.substring(1, auth.length - 1);
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

        request(options1, function(error, response) {
            if (error) throw new Error(error);
            auth1 = response.body;
            auth1 = JSON.parse(auth1);
            newBody = createBody(auth1.purchases[0].globalPurchaseNumber, auth1.purchases[0].products);
            console.log(newBody.slice(9))
            postDB(auth1.purchases[0].globalPurchaseNumber, auth1.purchases[0].products);
        });
    });
}, 5000)
max = 0


//server

	myAuth = basicAuth({
	  users: { 'admin': 'espresso',
	           'staff': 'latte',
	  },
	  challenge: true,
	  realm: 'foo',
	});

	app.use(express.static(path.join(__dirname, 'public')))
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'ejs')

    app.get('/', myAuth, (req, res) => res.render('pages/table'))
 
    app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
