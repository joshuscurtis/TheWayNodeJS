//env vars from heroku
const PORT = process.env.PORT || 5000	
const APIKEY = process.env.API
const DBKEY = process.env.DB 
const connectionString = process.env.DATABASE_URL;
const options3 = { /* ... */ };

//nodejs packages
const express = require('express')
const path = require('path')	
const app = express()
const http = require('http')
const basicAuth = require('express-basic-auth')
const server = require('http').createServer(app);
const request = require('request');
const bodyParser = require('body-parser');
const io = require('socket.io')(server, options3);


//error page for auth
var basicAuthError = '<html lang="id" dir="ltr">  <head>      <meta charset="utf-8" />      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />      <meta name="description" content="" />      <meta name="author" content="" />       <!-- Title -->      <title>Sorry, This Page Can&#39;t Be Accessed</title>      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.min.css" integrity="sha384-WskhaSGFgHYWDcbwN70/dfYBj47jz9qbsMId/iRN3ewGhXQFZCSftd1LZCfmhktB" crossorigin="anonymous" /> </head>  <body class="bg-dark text-white py-5">      <div class="container py-5">           <div class="row">                <div class="col-md-2 text-center">                     <p><i class="fa fa-exclamation-triangle fa-5x"></i><br/>Status Code: 403</p>                </div>                <div class="col-md-10">                     <h3>Incorrect Credentials</h3>                     <p>Your username and or password is incorrect. Please contact Rob, Steve or Jeremy for help.<br/>If you think you have made a mistake, please try again.</p>                     <a class="btn btn-danger" href="javascript:location.reload();">Try Again</a>                </div>           </div>      </div>       </body>  </html>'


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//socket io
io.on('connection', function(client) {
    console.log('Client connected...');
    
    client.on('join', function(data) {
		pool.query('select * from devorders where order_id in (SELECT order_id FROM devorders order BY order_id DESC LIMIT 20) ORDER BY order_id asc;', (err, res) => {
			console.log("sending init data...");
			io.sockets.emit('load',{ db: res.rows});
			console.log("sent!")
		});
    });
});


//pg connection
var data
const { Pool, Client } = require('pg');

const pool = new Pool({
  connectionString: connectionString,
})

pool.connect()


// Add headers
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
var dbPrev;

var auth;
var auth1;
var weatherAPI = {
            'url': "https://api.openweathermap.org/data/2.5/weather?q=Luton,uk&appid=ccda9d309ff5322478451b54ef0cfa38&units=metric",
            'method': "GET",
            'timeout': 0,
            'headers': {
                "content-type": "application/json"
            }
		}
		
setInterval(function(){ // Set interval for checking
    var date = new Date(); // Create a Date object to find out what time it is
    if(date.getHours() === 11 && date.getMinutes() === 30){ // Check the time
        // Do stuff
			request(weatherAPI, function(error, response) {
	console.log(response.body);
	body = JSON.parse(response.body)
	temp = body.main.temp;
	dateObj = new Date()
	date = dateObj.getFullYear() +"-0"+(dateObj.getMonth()+1)+"-0"+dateObj.getDate();
	var thisQuery = "UPDATE public.stats SET temp = "+temp+" WHERE date = '"+date+"';"
	
	console.log(thisQuery);
	pool.query(thisQuery, (err, result) => {
		console.log(result);
		console.log(err)
	})
})	
    }
}, 20000); // Repeat every 20000 milliseconds (20s)

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

function getTableNum(orderData) {
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
return tableCheck;
}




// auth settings
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
//alert counters
thisVal = 0
nextVal = 1
var theTime = 0
//


function pingDb() {
	var dbNow;
	var changed = false;
    pool.query('select * from devorders where order_id in (SELECT order_id FROM devorders order BY order_id DESC LIMIT 20) ORDER BY order_id asc;', (err, res) => {
		dbNow = res.rows;
		if(JSON.stringify(dbNow) != JSON.stringify(dbPrev)) changed = true;
		dbPrev = dbNow;
		if(changed) {
			console.log("change detected pushing data...")
			io.sockets.emit('db',{ db: res.rows});
		}
	})
	theTime = Date.now();
	setTimeout(pingDb, 500);
}
setTimeout(pingDb, 500)


//update cache every 15seconds
setInterval(function(){
	//send data over socket	
    pool.query('SELECT * FROM devorders order BY order_id DESC LIMIT 20;', (err, res) => {
			io.sockets.emit('cache',{ db: res.rows
		});
	})
}, 5000)


//every 5seconds
setInterval(function() {
	
	//request auth
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
		
		//request from izettle
        request(options1, function(error, response) {
            if (error) throw new Error(error);
            auth1 = response.body;
            auth1 = JSON.parse(auth1);
			
		//send to pg
		var thisQuery = "INSERT INTO public.devorders (order_id, products, istable, isnew, isclosed, isprocessing, time, tablenum) VALUES ("+auth1.purchases[0].globalPurchaseNumber+", '" +JSON.stringify(auth1.purchases[0].products)+"',"+doesOrderContainTable(auth1.purchases[0].products)+", "+true+", "+false+", "+false+", "+theTime+",'"+getTableNum(auth1.purchases[0].products)+"');"
		
		
		var latest;
		var newOrder;
		maxQ = "SELECT MAX(order_id) FROM devorders;"
		pool.query(maxQ, (err, res) => {
			latest = res.rows[0].max
			
			if (latest < auth1.purchases[0].globalPurchaseNumber) {
				console.log("new order detected...")
				newOrder = true
			}
			else {
				newOrder = false
			}	
		
			if(newOrder == true) {
				console.log('adding new order to db...')
				io.sockets.emit('broadcast',{ description: true});
				pool.query(thisQuery, (err, res) => {
					console.log(err);
					console.log(res);
				})
	
				//alert over socket
				nextVal = thisVal + 1
				if (nextVal == auth1.purchases[0].globalPurchaseNumber) //io.sockets.emit('broadcast',{ description: true});
				thisVal = auth1.purchases[0].globalPurchaseNumber;
			}
		})		
	});
});
}, 5000)
max = 0;
basicAuth({
  users: { 'admin': 'supersecret' },
  
})
//server
	myAuth = basicAuth({
	  users: { 'admin': 'espresso',
	           'staff': 'latte',
	  },
	  unauthorizedResponse: (req) => {
    	return  basicAuthError
	  },
	  challenge: true,
	  realm: 'foo',
	});
	
	adminAuth = basicAuth({
	  users: { 'admin': 'espresso',
	  },
	  unauthorizedResponse: (req) => {
    	return  basicAuthError
	  },
	  challenge: true,
	  realm: 'foo',
  });

	app.use(express.static(path.join(__dirname, 'public')))
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'ejs')

    app.get('/', myAuth, (req, res) => res.render('pages/table'))
	
	app.get('/orders/all', adminAuth , (req,result) => {
		pool.query('SELECT * FROM public.devorders', (err, res) => {
			result.send(res.rows)
		})
	})
	
	app.get('/qty', (req,result) => {
		result.send("qty")
	})
	
	app.get('/stats',adminAuth, (req,result) => {
		pool.query('SELECT order_id, time as created, closetime as closed, (closetime-time) as timetoclose, to_timestamp(CAST((time) as bigint)/1000) as date from devorders where closetime >1 order BY order_id ASC;', (err, res) => {
				ev = res.rows;
				result.render('pages/graph', {eventData : ev});
		});	
	})
	
	
	
	// app.get('/time', (req,result) => {
	// 	pool.query('SELECT order_id, time as created, closetime as closed, (closetime-time) as timetoclose, to_timestamp(CAST((time) as bigint)/1000) as date from devorders where closetime >1;', (err, res) => {
	// 		result.send(res.rows);
	// 	});
	// });
 	// app.get('/react', (req, res) => res.render('pages/react'))
	
	
	
	
	
//update db
	app.post('/update', (req,res) => {
		const id = req.body.id;
		const column = req.body.column
		const value = req.body.value
		var thisQuery = "UPDATE public.devorders SET "+column+" = "+value+" WHERE order_id = "+id;
		pool.query(thisQuery, (err, res) => {
			console.log(err);
			console.log(res);
		})
		res.send('Order:' +id+" has been updated at the column "+ column+ " with the value: " + value);
	})
//update stats
	app.post('/setStats', (req,res) => {
		const date = req.body.date;
		const avg = req.body.avgtime;
		const diff = req.body.diff;
		
		var thisQuery = "INSERT INTO public.stats (date, avgtime, diff) VALUES ('"+date+"', "+avg+", "+diff+");"
					
		console.log(thisQuery);
		pool.query(thisQuery, (err, res) => {
			console.log(thisQuery);
			console.log(res);
		})
		
		res.send('Date:' +date+" has been updated");
	})

	
	
app.post('/updateAvg', (req,res) => {
		const val = req.body.val;
		const col = "avgtime"
		const date = req.body.date
		
		var thisQuery = "UPDATE public.stats SET "+col+" = "+val+" WHERE date='"+date+"';"
		console.log(thisQuery)
		pool.query(thisQuery, (err, res) => {
			console.log(err);
			console.log(res);
		})
		
		res.send('Date:' +date+" has been updated");
	})
	
	app.post('/updateDiff', (req,res) => {
		const val = req.body.val;
		const col = "diff"
		const date = req.body.date
		
		var thisQuery = "UPDATE public.stats SET "+col+" = "+val+" WHERE date='"+date+"';"
		console.log(thisQuery)
		pool.query(thisQuery, (err, res) => {
			console.log(err);
			console.log(res);
		})
		
		res.send('Date:' +date+" has been updated");
	})
	
	app.get('/getStats', (req,res) => {
		
		var thisQuery = "SELECT * FROM public.stats order BY date;"

		pool.query(thisQuery, (err, result) => {
			res.send(result.rows);
		})
		
	})
	
	app.get('/orders/byId/:id', (req,res) => {
		var thisId = req.params.id;
		
		var thisQuery = "SELECT * FROM devorders WHERE order_id = "+thisId+";";
		console.log(thisQuery)
		pool.query(thisQuery, (err, result) => {
			res.send(result.rows);
		})
		
	})
	
	app.get('/orders/table/', (req,res) => {
		var thisId = true;
		
		var thisQuery = "SELECT * FROM devorders WHERE istable = "+thisId+";";
		console.log(thisQuery)
		pool.query(thisQuery, (err, result) => {
			res.send(result.rows);
		})
		
	})
	
	
	app.get('/orders/takeaway/', (req,res) => {
		var thisId = false;
		
		var thisQuery = "SELECT * FROM devorders WHERE istable = "+thisId+";";
		console.log(thisQuery)
		pool.query(thisQuery, (err, result) => {
			res.send(result.rows);
		})
		
	})
	
	app.get('/orders/20/', (req,res) => {
		var thisId = false;
		
		var thisQuery = "SELECT * FROM devorders order BY order_id DESC LIMIT 20;";
		console.log(thisQuery)
		pool.query(thisQuery, (err, result) => {
			res.send(result.rows);
		})
	})
	
	app.get('/react', (req,res) => {
		res.render('pages/react');
	})
	app.get('/dev', (req,res) => {
		res.render('pages/react__stats');
	})
	
//START SERVER
server.listen(PORT);