console.log("starting iOrders...")

//socket.io
const socket = io();

socket.on('connect', function(data) {
	socket.emit('join', 'Hello World from client');
});

socket.on('broadcast', function(data) {
	console.log(data.description);
	if(data.description == true) audio.play();
});

socket.on('cache', function(data) {
	for(var i = 0; i < (data.db).length; i++) {
		sessionStorage.setItem(data.db[i].order_id, JSON.stringify(data.db[i]))
	}
});

//global orders var
var allOrders;

//check if new user orders alert
function checkNew() {
	if(localStorage.getItem("newUser") === null) {
		window.newUserModal();
	}
}
setTimeout(function() {
	checkNew();
}, 1000)
	
//split view functions
function setToSplit() {
	view = "split"
	left = document.getElementById("content");
	right = document.getElementById("right");
	right.innerHTML = "<h3 class='text-center'>Table Orders</h3>"
	left.innerHTML = "<h3 class='text-center'>Takeaway Orders</h3>"
	left.setAttribute("style", "width:45%;margin-left:5%;position:absolute;left:0;")
	right.setAttribute("style", "width:45%;margin-right:5%;position:absolute;right:0;")
}
function unSplit() {
	view = "norm"
	left = document.getElementById("content");
	right = document.getElementById("right");
	left.setAttribute("style", "")
	right.setAttribute("style", "")
}

//find order by id
function searchOrders(id) {
	orders = allOrders;
	for(var y = 0; y < orders.length; y++) {
		currentid = orders[y].order_id;
		if(currentid == id) {
			return orders[y]
		}
	}
	return dummy;
}

//return the cached order as a object
function getCachedOrder(id) {
	try {
		order = sessionStorage.getItem(id);
		order = JSON.parse(order);
		return order;
	}
	catch (error) {
		console.log(error);
		return dummy;
	}
}

//make changes to a cached order
function setCachedOrder(id, param, val) {
	try {
		order = sessionStorage.getItem(id);
		order = JSON.parse(order);
		order[param] = val;
		sessionStorage.setItem(JSON.stringify(order));
	}
	catch (error) {
		console.log(error);
	}
}

//returns newest order id
function newestOrder() {
	orders = allOrders;
	if(orders.length == null) return newestOrder()
	id = 0
	for(var y = 0; y < orders.length; y++) {
		currentid = orders[y].order_id;
		if(currentid > id) {
			id = currentid;
		}
	}
	return id
}

//is order closed in either cache or db
function isClosed(id) {
	return searchOrders(id).isclosed;
}
//is order processing in either cache or db
function isProcessing(id) {
	if(searchOrders(id).isprocessing) return true;
	return false;
}

//is order bar status in either cache or db
function isBarDone(id) {
	
	status = searchOrders(id).assignee2
	return status
}
//is order kitchen status in either cache or db
function isKitDone(id) {
	
	status = searchOrders(id).assignee
	return status
}


function isTable(id) {
	try {
		table = searchOrders(id).istable;
	} catch(err) {
		return true;
	} finally {
		return table;
	}
}


var aId, barButton, kitButton;
function drawNth(x, table) {
	let divId = searchOrders(newestOrder()).order_id - x;
	let aId = divId
	
	if(document.getElementById(divId) != null && view != "split") document.getElementById(divId).remove();
	if(option == "split" && isTable == false) document.getElementById(divID).remove();

	//check if order is closed and is a table order
	dbOrCacheClosed = (isClosed(divId) || getCacheClosedOrder(divId));
	if(document.getElementById(divId) == null && (dbOrCacheClosed == false) && isTable(divId) == table) {
		
		//create div
		g = document.createElement('div');
		
		//set id and styling
		g.setAttribute("id", divId);
		g.setAttribute("style", "margin: 10px");
		g.setAttribute("class", "card text-white bg-success mb-3")
		g.setAttribute("onclick", 'highlight(this);')
		
		//set card content
		isSplit = document.getElementById("content").getAttribute("style")
		target = "content"
		if(isSplit == "width:45%;margin-left:5%;position:absolute;left:0;") {
			if(table == true) target = "right"
			if(table == false) target = "content"
		}
		document.getElementById(target).appendChild(g);
		
		//set order time, if nothing from server
		if(searchOrders(id).time == null) updatePG(id, "time", Date.now())
		
		//get card 
		document.getElementById(divId).innerHTML = createOrderCardContent(searchOrders(divId));
	

		
		//highlight for processing 
		if(isProcessing(divId)) highlight2(g);
		
		//bar and kitchen button actions
		let barButton = document.getElementById('b'+aId)
		barButton.addEventListener('click', function(){
			event.stopPropagation();
   			updatePG(aId, 'assignee2', false);
			//setCachedOrder(aId, 'assignee2', false);
			
			thisbutton = document.getElementById('b'+aId)
			thisbutton.setAttribute("class", "btn btn-success")
			console.log('Order id: '+aId+ " Bar");
		});
		
		let kitButton = document.getElementById('k'+aId)
			kitButton.addEventListener('click', function(){
			event.stopPropagation();
   			updatePG(aId, 'assignee', false);
			//setCachedOrder(aId, 'assignee1', false);
			
			console.log('Order id: '+aId+ " Kitchen");
			thisbutton = document.getElementById('k'+aId)
			thisbutton.setAttribute("class", "btn btn-success")
		});
		SLAHighlight(divId);
	}
}

function drawPastXTableOrders(x, order) {
	if(order == 'asc') {
		for(i = x; i >= 0; i--) {
			drawNth(i, true);
		}
	}
	if(order == 'desc') {
		for(i = 0; i <= x; i++) {
			drawNth(i, true);
		}
	}
}

function drawPastXTakeawayOrders(x, order) {
	if(order == 'desc') {
		for(i = 0; i <= x; i++) {
			drawNth(i, false);
		}
	}
	if(order == 'asc') {
		for(var i = x; i >= 0; i--) {
			drawNth(i, false)
		}
	}
}

function checkIfStillOpen(id) {
	closed = isClosed(id)
	if(closed) {
		document.getElementById(id).remove();
	}
}

function countOpen(num) {
	count = 0;
	for(i = 0; i <= num; i++) {
		thisOrder = searchOrders(newestOrder() - i)
		if((isClosed(newestOrder() - i) != true) && (isTable(newestOrder() - i))) {
			count = count + 1
		}
	}
	return count;
}

function countOpenTake(num) {
	count = 0;
	for(i = 0; i <= num; i++) {
		thisOrder = searchOrders(newestOrder() - i)
		if((isClosed(newestOrder() - i) != true) && (isTable(newestOrder() - i) == false)) {
			count = count + 1
		}
	}
	return count;
}

function highlight(el) {
	var element = el;
	id = element.getAttribute("id");
	//console.log("highlight"+id)
	if(searchOrders(id).isprocessing == true) {
		remove2(el)
	};
	element.setAttribute("class", 'card text-white bg-warning mb-3')
	processOrder(id)
}

function highlight2(el) {
	var element = el;
	id = element.getAttribute("id");
	//console.log("highlight"+id)
	if(element.getAttribute("class") == "card text-white bg-warning mb-3") {
		remove2(el)
	};
	element.setAttribute("class", 'card text-white bg-warning mb-3')
}

function remove2(el) {
	element = el;
	id = element.getAttribute("id");
	closeOrderModal(id)
}

function remove(el) {
	var element = el;
	id = element.getAttribute("id");
	assignOrderModal(id, element)
}

function closeOrderModal(id) {
	Swal.fire({
		title: 'CONFRIM ORDER: ' + ((id % 99) + 1),
		text: "Click Yes, to confirm the order as complete",
		icon: 'success',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, close order!'
	}).then((result) => {
		if(result.value) {
			//localStorage.removeItem(id);
			//localStorage.setItem("closed", id + "," + localStorage.getItem("closed"));
			closeOrder(id);
			setCacheClosedOrder(id);
			document.getElementById(id).remove();
		}
	});
}

function assignOrderModal(id, element) {
	Swal.fire({
		title: 'Confirm all bar/kitchen items are complete: ',
		text: "Select the area which is complete",
		icon: 'info',
		showCancelButton: true,
		cancelButtonText: 'Bar',
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Kitchen'
	}).then((result) => {
		if(result.value) {
			updatePG(id, 'assignee', false)
			assginOrder(id, "Kitchen")
		} else {
			assginOrder(id, "Bar")
			updatePG(id, 'assignee2', false)
		};
	});
}

function alertModal() {
	Swal.fire({
		title: 'Lots of open orders',
		text: "There are more than 7 open orders! ",
		icon: 'info',
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'Ok'
	})
}


function newUserModal() {
	Swal.fire({
		title: 'New User!',
		text: "Welcome to Orders App for The Way! If you have not used this before please speak to Rob/Steve/Sarah first.",
		icon: 'info',
		confirmButtonColor: '#3085d6',
		confirmButtonText: 'I Understand'
	}).then((result) => {
			localStorage.setItem("newUser", "false")
	});
}

function closeOrder(id) {
	document.getElementById(id).remove()
	updatePG(id, 'isclosed', true)
	updatePG(id, 'closetime', Date.now())
	
}

function updatePG(id, column, value) {
	var settings = {
		"url": "/update",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"data": {
			"value": value,
			"id": id,
			"column": column
		}
	};
	$.ajax(settings).done(function(response) {}).fail(function(data) {
		console.log("fail ")
	});
}

function assginOrder(id, assignee) {
	document.getElementById('a' + id).innerHTML = assignee;
	updatePG(id, 'assignee', assignee)
}

function processOrder(id) {
	setCacheProcessingOrder(id);
	updatePG(id, 'isprocessing', true)
}

//defaults
var initCounter = 0;
var displayOrder = "asc"
var numOfPastOrders = 20
var slaTime = 3600;
var option = "split"
var audio = new Audio('https://github.com/joshuscurtis/theway/raw/master/piece-of-cake.mp3');

//over 7 orders open alert modal
setInterval(function() {
	if(openOrders > 7) alertModal();
}, 60000)

//get orders from server every 0.5secs
function refresh() {
	getAllOrders();
	setTimeout(refresh, 500);
}


function refresh2() {
	content = document.getElementById("content");
	content.innerHTML = '';
	
	if(option == 'table') {
		unSplit()
		drawPastXTableOrders(numOfPastOrders, displayOrder)
		openOrders = countOpen(numOfPastOrders)
	};
	
	if(option == 'takeaway') {
		unSplit()
		drawPastXTakeawayOrders(numOfPastOrders, displayOrder);
		openOrders = countOpenTake(numOfPastOrders);
	}
	
	if(option == "split") {
		openOrders = countOpen(numOfPastOrders) + countOpenTake(numOfPastOrders);
		setToSplit()
		drawPastXTakeawayOrders(numOfPastOrders, displayOrder);
		drawPastXTableOrders(numOfPastOrders, displayOrder);
	}
	
	count = document.getElementById("count")
	count.innerHTML = "<strong col>Open Orders: " + (openOrders) + "</strong>"
	if(openOrders >= 5) count.setAttribute("style", "color: red;")
	if(openOrders <= 4) count.setAttribute("style", "color: orange;")
	if(openOrders <= 2) count.setAttribute("style", "color: green;")
	
	loader = document.getElementById('loader');
	if(loader != null) loader.remove();
	
	setTimeout(refresh2, 5000);
}

//init loop
setTimeout(refresh, 1000);
setTimeout(refresh2, 5000);

//use io to get data from db
function getAllOrders() {
	socket.on('db', function(data) {
		allOrders = data.db;
	});
}


function createTime(unixdate) {
	var date = new Date(unixdate*1);
	var hours = date.getHours();	
	var minutes = "0" + date.getMinutes();
	var seconds = "0" + date.getSeconds();

	var formattedTime = minutes.substr(-2) + ':' + seconds.substr(-2);
	return formattedTime;
}


//flash card after ordertime exceeded
function SLAHighlight(id){
	thisOrder = searchOrders(id)
	orderTime = thisOrder.time;
	card = document.getElementById(id);
	
	if (Math.round(((Date.now() - orderTime)/1000)) > slaTime) {
		currentClass = card.getAttribute("class")
		card.setAttribute("class", "flashit " +  currentClass);
	}
}

//create order card
function createOrderCardContent(responseObj) {
	//order details
	var orderDetails = responseObj;
	var	id = orderDetails.order_id
	var orderData = orderDetails.products
	var istable = orderDetails.istable;
	var isclosed = orderDetails.isclosed;
	var isnew = orderDetails.isnew;
	var orderTime = orderDetails.time; 
	var tableNum = 0	
	
	SLAHighlight(id);
	
	//setup take/table order
	for(var y = 0; y < orderData.length; y++) {
		if((orderData[y].name).substring(0, 5) == "Table") {
			tableNum = (orderData[y].name).substring(6, 10)
		}
	}
	//Set Title For Order Card
	if(istable == true) var html1 = " <h5> Table " + tableNum + " (Order: " + (id % 99 + 1) + ")</h5>";
	if(istable == false) var html1 = " <h5> Order: " + (id % 99 + 1) + "</h5>";
	
	//card html
	var cardTop = '<div class="card text-center" style="background-color: inherit">' + html1 + '<div style="padding: 0;" class="card-body"><h5 class="card-title">'
	var cardMid = '</h5>'
	var cardEnd = '</div></div>';
	
	var variantName = ""
	var html2 = "";
	
	//create card body
	//loop through each item in a order
	for(var y = 0; y < orderData.length; y++) {
		//loop through all items in order except table products.
		if((orderData[y].name).substring(0, 5) != "Table") {
			//add porduct name and qty
			if(orderData[y].variantName == null || orderData[y].variantName == "") {
				html2 = "<p>" + html2 + "<p>" + "<strong>" + orderData[y].name + "</strong> <br> Qty: <a id='qty'>" + orderData[y].quantity + ' </a> <br>'
			} else {
				//add varient name and qty, if exists
				variantName = "<br>" + orderData[y].variantName + "<br>"
				html2 = "<p>" + html2 + "<p>" + "<strong>" + orderData[y].name + "</strong><i>" + variantName + "</i> Qty: <i> <a id='qty'>" + orderData[y].quantity + '</a> </i> <br>'
			}
			//if comment, add it
			if(orderData[y].comment != undefined) {
				html2 = "<p>" + html2 + "Comments:<i> " + orderData[y].comment + "</i><br> </p>";
			}
		}
	}
	
	//set assignee buttons
	if(orderDetails.assignee == null) var assignee = "danger";
	else assignee = orderDetails.assignee;
	assignee2 = orderDetails.assignee2;
	if(assignee2 == null) assignee2 = 'danger';
	
	
	if(assignee == 'true') {
		assignee = "danger"
	};
	if(assignee == 'false') {
		assignee = "success"
	};
	if(assignee2 == 'true') {
		assignee2 = "danger"
	};
	if(assignee2 == 'false') {
		assignee2 = "success"
	};
	
	result = "";
	if(assignee2 == 'success' && assignee == 'success') result = "Done"
	
	//add cog
	html2 = '<button onclick="event.stopPropagation();remove(this.parentNode.parentNode.parentNode)" style="position: absolute; top: 0px; right: 1px;" type="button" class="close" aria-label="Close"><span class="fa fa-cog" aria-hidden="true"></span></button>' + "<p>" + html2 + "<b id='a" + id + "' style='color:black;'> " + (result) + "</b><br> </p>";
	
	//add buttons
	html2 = html2 + '<button id="b' + id + '" type="button" style="position: absolute;bottom: 0px;right: 1px;max-width: 80px;width: 25%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" class="btn btn-' + assignee2 + '"><i class="fa fa-coffee" style="margin-right: 5px;" ></i> Bar</button>' + '<button  onclick="updatePG('+id+', "assignee", false);" id="k' + id + '" type="button" style="position: absolute;bottom: 0px;left: 1px;max-width: 80px;width: 25%;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;" class="btn btn-' + assignee + '"><i style="margin-right: 5px;" class="fa fa-cutlery"></i> Kitchen</button>'
	
	//generate final order card HTML
	buildHTML = cardTop + cardMid + html2 + createTime(Date.now() - orderTime) + cardEnd;
	html2 = "";
	
	return buildHTML;	
}

//closed order caching
function setCacheClosedOrder(id) {
	orderData = searchOrders(id)
	orderData.isclosed = true
	sessionStorage.setItem(id, JSON.stringify(orderData));
}
function getCacheClosedOrder(id) {
	orderData = JSON.parse(sessionStorage.getItem(id));
	if(orderData == null) return false
	return orderData.isclosed;
}

//processing cache
function setCacheProcessingOrder(id) {
	orderData = searchOrders(id)
	orderData.isprocessing = true
	sessionStorage.setItem(id, JSON.stringify(orderData));
}
function getCacheProcessingOrder(id) {
	orderData = JSON.parse(sessionStorage.getItem(id));
	if(orderData == null) return false
	return orderData.isprocessing;
}

//Assignee caching
function setCacheAssigneeOrder(id, assignee) {
	orderData = searchOrders(id)
	orderData.assignee = assignee;
	sessionStorage.setItem(id, JSON.stringify(orderData));
}
function getCacheAssigneeOrder(id) {
	orderData = JSON.parse(sessionStorage.getItem(id));
	if(orderData == null) return false
	return orderData.assignee;
}
function setCacheAssignee2Order(id, assignee) {
	orderData = searchOrders(id)
	orderData.assignee2 = assignee;
	sessionStorage.setItem(id, JSON.stringify(orderData));
}
function getCacheAssignee2Order(id) {
	orderData = JSON.parse(sessionStorage.getItem(id));
	if(orderData == null) return false
	return orderData.assignee2;
}



//dummyjson for errors
dummy = {
	"istable": true,
	"order_id": 0000,
	"products": [{		
		"quantity": "1",
		"name": "Table 00",
		"id": "0"
	}, {
		"quantity": "999",
		"name": "error",
		"id": "1"
	}, {
		"quantity": "1",
		"name": "ERROR ERROR",
		"id": "2"
	}, {
		"quantity": "1",
		"name": "ERROR",
		"id": "3"
	}],
	"isnew": true,
	"isclosed": true,
	"isprocessing": null,
	"assignee": "An ERROR has occured."
	}