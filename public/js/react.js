const {
  colors,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  Box,
  SvgIcon,
  Link,
  AppBar,
  Toolbar,
  MenuIcon,
  IconButton,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  ButtonBase,
  KitchenIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  MuiThemeProvider,
  createMuiTheme,
  red,
  green,
} = MaterialUI;

const {
	useState,
	useEffect,
} = React


const theme = createMuiTheme({
  palette: {
    primary: green,
    secondary: green,
    error: green,
  },
  });

 function SettingsDialog(props) {
	const [open, setOpen] = React.useState(false);
  
	const handleClickOpen = e => {
		e.stopPropagation();
	    setOpen(true);
	};
	const handleClose = e => {
		e.stopPropagation();
	    setOpen(false);
	};
	
return (
    <div>
      <Button 
	  	size="large" 
		variant="contained" 
	 	onClick={handleClickOpen}>
		Settings
      </Button>
	  
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">{"General Settings"}</DialogTitle>
	  
      <DialogContent>
     		<DialogContentText id="alert-dialog-description">
				Time before alert:
            </DialogContentText>
		    <DialogContentText id="alert-dialog-description">
		    </DialogContentText>
		    <DialogContentText id="alert-dialog-description">
		    </DialogContentText>
        </DialogContent>
		
        <DialogActions>
        	<Button 
		  		className="OrderCard__closeButton" 
			    onClick={handleClose}
		 	    color="primary"
			    autoFocus>Close
            </Button>
        </DialogActions>
		
      </Dialog>
    </div>
  );
}
  
  
  
function AlertDialog(props) {
	const [open, setOpen] = React.useState(false);
  
	const handleCloseOrder = e => {
		e.stopPropagation();
	    setOpen(false);
		updatePG(props.id, 'isclosed', true);
	};
	const handleClickOpen = e => {
		e.stopPropagation();
	    setOpen(true);
	};
	const handleClose = e => {
		e.stopPropagation();
	    setOpen(false);
	};
	
return (
    <div>
      <Button size="large" variant="contained" color="secondary" onClick={handleClickOpen}>
		Close
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure you want to close this order?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
		  	Once the order has been served, close the order.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
			Cancel
          </Button>
          <Button className="OrderCard__closeButton" onClick={handleCloseOrder}
		 	  color="primary"
			  autoFocus>
            Close Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

function timeCalc(createdTime) {
	var timeNow = Date.now();
	var timeOpen = timeNow - createdTime;
	timeOpen = new Date(timeOpen);
	var timeOpenStr = timeOpen.getMinutes() + "m " + timeOpen.getSeconds()+"s"
	return (timeOpenStr);
}

function checkAlert(createdTime, alertAfter) {
	var timeNow = Date.now();
	var timeOpen = timeNow - createdTime;
	timeOpen = new Date(timeOpen);
	timeOpen = timeOpen/1000
	if(timeOpen > alertAfter) return true
	else return false
}


function CardApp(props) {
	//do not create closed orders
	if(props.isclosed === true){
		return (null);
	}
	//set states
	const [close, setClose] = useState(false);
	const [timer, setTimer] = useState(timeCalc(props.time));
	const [alert, setAlert] = useState("");
	
	//calc time
	useEffect(() => {
		const interval = setInterval(() => {
			setTimer(timeCalc(props.time));
			if(checkAlert(props.time, 600)) setAlert("flash");
		}, 1000);
		return () => {
			setTimer(timeCalc(props.time));
			clearInterval(interval);
			console.log("unmount")
		}
	},[]);
	
	
	//default button colours
	var kitCol = false
	var barCol = false
	if(props.assignee == "false") kitCol = true
	if(props.assignee2 == "false") barCol = true
	
	//create card title
	var cardTitle = "Order: " + (props.orderid%99+1);
	if (props.tablenum != null) {
		cardTitle = props.tablenum + " (Order: "+(props.orderid%99+1)+")";
	}
	if (props.tablenum.substring(0,5) != "Table") {
		cardTitle = "Order: " + (props.orderid%99+1);
	}

	//set order id	
	const [id, setId] = useState(0);
	useEffect(() => {
		setClose(false)
		setId(props.orderid);
		console.log('setId: ' + id)
		return () => {
			console.log('return block')
		}
	}, []);
	
	//onClick action
 	const handleClick = e => {
		if(props.isprocessing == false) updatePG(id, 'isprocessing', true);
		e.stopPropagation();
	}
	
  return (
      <div className={alert}>
		<Card className="OrderCard__Main" onClick={handleClick} style={{backgroundColor: props.isprocessing ? '#f0ad4e' : '#5cb85c',}} variant="outlined">
			<CardHeader	
				title={cardTitle}
				subheader={timer}
				action={<AlertDialog close={close} id ={id}/>}>
			</CardHeader>
			<CardContent>
				<OrderItems order={props.order} />
			</CardContent>

			<CardActions>
	        		<KitchenButton orderId={props.orderid} colour={kitCol}/>
					<BarButton  orderId={props.orderid} colour={barCol}/>
			</CardActions>
		</Card>
    </div>
  );
}

function BarButton(props){
const [id, setId] = useState(0);
//console.log(props.orderId)

useEffect(() => {
	setId(props.orderId);
	console.log('setId: ' + id)
	return () => {
		console.log('return block')

	}
}, []);

 	const handleClick = e => {
		e.stopPropagation();
		updatePG(id, 'assignee2', false)
 	}
	
	
	
	return (
	<ThemeProvider theme={theme}>
	 	<Button 
			className="Card__BarButton"
			onClick={handleClick}
			variant="contained" 
			size="large"
			style={{backgroundColor: props.colour ? '#5cb85c' : '#f50057', 			color:'white'
			}}
		>
		Bar
		</Button>
	</ThemeProvider>
	);
}

function KitchenButton(props){
const [id, setId] = useState(0);
//console.log(props.orderId)

useEffect(() => {
	setId(props.orderId);
	console.log('setId: ' + id)
	return () => {
		console.log('return block')
	}
}, []);

	const handleClick = e => {
		e.stopPropagation();
		updatePG(id, 'assignee', false)
 	}
	
	return (
	 	<Button 
			className="Card__KitButton"
			onClick={handleClick}
			variant="contained" 
			style={{backgroundColor: props.colour ? '#5cb85c' : '#f50057', 			color:'white'
				    }}
			size="large"
		>
		Kitchen
		</Button>
		);
}

function ButtonAppBar() {

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className="AppBar__main">
			<img className="AppBar__logo" src="iorder.png" />
			<Typography className="App__Title" align="center" variant="h4" component="h1">
		    	iOrders
			</Typography>
			<SettingsDialog/>
        </Toolbar>
      </AppBar>
    </div>
  );
}

function TakeawayStream(props) {
	var rows = [];
	var orders = props.orders;
	
//	console.log(orders);
	for (var i = 0; i < orders.length; i++) {
		if(orders[i].tablenum.substring(0,5) != "Table"){
    		rows.push(<CardApp 
						orderid={orders[i].order_id}
						order={orders[i]} 
						time={orders[i].time}
						isprocessing={orders[i].isprocessing}
						istable={orders[i].istable}
						isnew={orders[i].isnew}
						isclosed={orders[i].isclosed}
						tablenum={orders[i].tablenum}
						assignee={orders[i].assignee}
						assignee2={orders[i].assignee2}/>);
		}
	}
  return (
    <div className="Takeaway__Stream">
		<Typography className="Stream__title" align="center" variant="h5">
		    	Takeaway Orders
		</Typography>
		{rows}
	</div>
  );
}


function TableStream(props) {
	var rows = [];
	var orders = props.orders;
//	console.log(orders);
	for (var i = 0; i < orders.length; i++) {
		if(orders[i].tablenum.substring(0,5) == "Table") {
    		rows.push(<CardApp 
						orderid={orders[i].order_id}
						order={orders[i]} 
						time={orders[i].time}
						isprocessing={orders[i].isprocessing}
						istable={orders[i].istable}
						isnew={orders[i].isnew}
						isclosed={orders[i].isclosed}
						tablenum={orders[i].tablenum}
						assignee={orders[i].assignee}
						assignee2={orders[i].assignee2}/>);
		}
	}
  return (
    <div className="Table__Stream">
		<Typography className="Stream__title" align="center" variant="h5">
		    	Table Orders
				</Typography>
		{rows}
	</div>
  );
}

function OrderItem(props) {
var comment = "";
 if(props.comment != null) comment = "Comment: " +props.comment

const [strikeClass, setStrikeClass] = useState("");

const handleClick = e => {
	if(strikeClass != "crossed-line") setStrikeClass("crossed-line");
	if(strikeClass == "crossed-line") setStrikeClass("");
}
 
 return (
<div className={strikeClass} onClick={handleClick}>
<Box m={1} borderBottom={1}>
    <Typography variant="h5" align="center">
		{props.itemName}
    </Typography>
	<Typography variant="subtitle2" align="center">
		{props.variantName}
    </Typography>
	<Typography variant="h6" color="textSecondary" align="center">
		Qty: {props.qty}
	</Typography>
		<Typography variant="subtitle1" color="textSecondary" align="center">
		{comment}
	</Typography>
</Box>
</div>
  );
}

function OrderItems(props) {
	var order = props.order;
	//console.log(order);
	var rows = [];
	for (var i = 0; i < order.products.length; i++) {
		if (order.products[i].name.substring(0,5) != "Table") {
    		rows.push(<OrderItem variantName={order.products[i].variantName} itemName={order.products[i].name} qty={order.products[i].quantity} comment={order.products[i].comment}
				key={i} />);
		}
	}
  return (
    <div>
		{rows}
	</div>
  );
}

function cardTimer(createdTime) {
	var timeNow = Date.now();
	var timeOpen = timeNow - createdTime;
	timeOpen = new Date(timeOpen);
	
	var timeOpenStr = timeOpen.getMinutes() + "m " + timeOpen.getSeconds()+"s"
	return (timeOpenStr);
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



function App() {
const socket = io();	
const [orderData, setOrderData] = useState(0);

useEffect(() => {
	console.log('starting socketio...')
	socket.on('connect', function(data) {
		socket.emit('join', 'Hello World from react client');
	});
	
	socket.on('load', function(data) {
		console.log("loading data...");
		setOrderData(data.db);
	});
	
	socket.on('db', function(data) {
		console.log("getting data for react...");
		setOrderData(data.db)
	});
	
	return () => {
		console.log('stop socket')
		socket.removeAllListeners();
		socket.off('db');
		socket.off('load');
	}
}, []);
return (
  <div style={{ margin: 0, }}>
  	 <ButtonAppBar/>
		<Container className="App_Contents" maxWidth="lg">
			<Grid container spacing={3}>
		        <Grid item xs={6} spacing={3}>
					<TakeawayStream orders={orderData}/>
		        </Grid>
		        <Grid item xs={6} spacing={3}>
					<TableStream orders={orderData}/>
		        </Grid>
				<Grid item xs={12}>
			  	</Grid>
			</Grid>
  		</Container>
	</div>
  );}

ReactDOM.render(<App />, document.querySelector('#root'));