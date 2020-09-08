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
} = MaterialUI;

const {
	useState,
	useEffect,
} = React




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
      <Button variant="contained"  color="secondary" onClick={handleClickOpen}>
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
          <Button className="OrderCard__closeButton" onClick={handleCloseOrder} color="primary" size="large" autoFocus>
            Close Order
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}








function CardApp(props) {
	if(props.isclosed === true){
		return (null);
	}
	
	const [close, setClose] = useState(false);
	
	var cardTitle = "Order: " + props.orderid;
	if (props.tablenum != null) {
		cardTitle = props.tablenum + " (Order: "+props.orderid+")";
	}
	if (props.tablenum.substring(0,5) != "Table") {
		cardTitle = "Order: " + props.orderid;
	}
	var kitCol = "secondary"
	var barCol = "secondary"
	
	if(props.assignee == "false") kitCol = "primary"
	if(props.assignee2 == "false") barCol = "primary"
	
	const [id, setId] = useState(0);
	useEffect(() => {
		setClose(false)
		setId(props.orderid);
		console.log('setId: ' + id)
		return () => {
			console.log('return block')
	
		}
	}, []);
	
	
	 	const handleClick = e => {
    		e.stopPropagation();
			console.log(id);
			if(props.isprocessing === true) {
				console.log("close order...");

				console.log("closed");
			}
			if(props.isprocessing == false) updatePG(id, 'isprocessing', true);
		}
	
  return (

      <div>

		<Card className="OrderCard__Main" onClick={handleClick} style={{backgroundColor: props.isprocessing ? '#f0ad4e' : '#5cb85c',}} variant="outlined">
			<CardHeader	title={cardTitle} subheader={props.time}>
			</CardHeader>
			<CardContent>
				<OrderItems order={props.order} />
			</CardContent>
			<CardActions>
        		<KitchenButton orderId={props.orderid} colour={kitCol}/>
				<BarButton orderId={props.orderid} colour={barCol}/>
				<AlertDialog close={close} id ={id}/>
			</CardActions>
		</Card>
    </div>

  );
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
	 	<Button 
			onClick={handleClick}
			variant="contained" 
			color={props.colour}
			size="large"
		>
		Bar
		</Button>
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
			onClick={handleClick}
			variant="contained" 
			color={props.colour}
			size="large"
		>
		Kitchen
		</Button>
		);
}


function ButtonAppBar() {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
			<Typography align="center" variant="h4" component="h1" gutterBottom>
		    	iOrders
			</Typography>
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
						time={orders[i].closetime}
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
    <div>
		{rows}
	</div>
  );
}


function TableStream(props) {
	var rows = [];
	var orders = props.orders;
//	console.log(orders);
	for (var i = 0; i < orders.length; i++) {
		if(orders[i].tablenum.substring(0,5) == "Table"){
    		rows.push(<CardApp 
						orderid={orders[i].order_id}
						order={orders[i]} 
						time={orders[i].closetime}
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
    <div>
		{rows}
	</div>
  );
}

function OrderItem(props) {
var comment = "";
 if(props.comment != null) comment = "Comment: " +props.comment
return (
   

const handleClick = e => {
	  this.setState({
      	bgColor: 'blue'
  })
}

<div style={{backgroundColor:this.state.bgColor}}
	 onClick={this.handleClick} 
>
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
		socket.off('db');
		socket.off('load');
	}
}, []);


  return (
      <div style={{ margin: 0, }}>
		<Container maxWidth="lg">
			<Grid container spacing={3}>
		        <Grid item xs={12}>
					<ButtonAppBar/>
		        </Grid>
		        <Grid item xs={6} spacing={3}>
		        	<Typography variant="h4" component="h1" gutterBottom>
		          		Takeaway Orders
			  		</Typography>
					<TakeawayStream orders={orderData}/>
		        </Grid>
		        <Grid item xs={6} spacing={3}>
		        	<Typography variant="h4" component="h1" gutterBottom>
		          		Table Orders
			  		</Typography>
					<TableStream orders={orderData}/>
		        </Grid>
				<Grid item xs={12}>
			  	</Grid>
			</Grid>
  </Container>
</div>
  );}

ReactDOM.render(<App />, document.querySelector('#root'));