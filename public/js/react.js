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
} = MaterialUI;

const {
	useState,
	useEffect,
} = React


function CardApp(props) {
	if(props.isclosed === true){
		return (null);
	}
	
	
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
	
  return (
      <div style={{margin: 5,}}>
		<Card style={{backgroundColor: props.isprocessing ? '#f0ad4e' : '#5cb85c',}} variant="outlined">
			<CardHeader	title={cardTitle} subheader={props.time}>
			</CardHeader>
			<CardContent>
				<OrderItems order={props.order} />
			</CardContent>
			<CardActions>
        		<Button  variant="contained" color={kitCol} size="large">Kitchen</Button>
				<Button variant="contained" color={barCol} size="large">Bar</Button>
			</CardActions>
		</Card>
    </div>
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
   
<div>
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
    		rows.push(<OrderItem variantName={order.products[i].variantName} itemName={order.products[i].name} qty={order.products[i].quantity} comment={order.products[i].comment}/>);
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
	socket.on('cache', function(data) {
		console.log("refreshing cache...");
		setOrderData(data.db)
	});
}, []);

socket.off('cache');


  //   $.ajax({
  //     url:'/orders/20',
  //     method:'GET',
  //     success: function(data){
	// 	console.log(data);
  //       setOrderData(data);
	// 	console.log(orderData);
  //     }.bind(this),
  //     error: function(xhr, status, err){
  //       console.log(err);
  //       alert(err);
  //     }
  // });
	
	
  

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