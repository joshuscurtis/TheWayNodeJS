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

function CardApp(props) {

  return (
      <div style={{ margin: 5, }}>
		<Card variant="outlined">
			<CardHeader title={"Order: " +props.orderid} subheader={props.time}>
			</CardHeader>
			<CardContent>
				<OrderItems itemNames={props.itemNames} order={props.order} />
			</CardContent>
			<CardActions>
        		<Button size="small">Kitchen</Button>
				<Button size="small">Bar</Button>
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
			<Button color="inherit">Login</Button>
			<Typography variant="h4" component="h1" gutterBottom>
		    	iOrders
			</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}


function Copyright() {
  return (
    <Typography variant="h6" color="textSecondary" align="center">
		Item 1
    </Typography>
  );
}

function OrderItem(props) {
  return (
   <div>
    <Typography variant="h5" align="center">
		{props.itemName}
    </Typography>
	    <Typography variant="h6" color="textSecondary" align="center">
		Qty: {props.qty}
		</Typography>
	</div>
  );
}

function OrderItems(props) {
	var order = props.order;
	console.log(order);
	var rows = [];
	for (var i = 0; i < 1; i++) {
    	rows.push(<OrderItem itemName={order.product[i].itemName} qty={order.product[i].qty} />);
	}
  return (
    <div>
		{rows}
	</div>
  );
}


function App() {
var aOrder = {
        id: 99,
        product: [{
        			itemName: "item1",
					qty: 2
       			 },
				{
        			itemName: "item2",
					qty: 2
				}
		],
        isclosed: false
    };

	
  return (
      <div style={{ margin: 0, }}>
		<Container maxWidth="lg">
			<Grid container spacing={3}>
		        <Grid item xs={12}>
					<ButtonAppBar/>
		        </Grid>
		        <Grid item xs={6} spacing={3}>
		        	<Typography variant="h4" component="h1" gutterBottom>
		          		Left
			  		</Typography>
		        </Grid>
		        <Grid item xs={6} spacing={3}>
		        	<Typography variant="h4" component="h1" gutterBottom>
		          		Right
			  		</Typography>
					<CardApp orderid="99" items="2" order={aOrder} time="5 mins 45 secs"/>
		        </Grid>
				<Grid item xs={12}>
			  	</Grid>
			</Grid>
  </Container>
</div>
  );}

ReactDOM.render(<App />, document.querySelector('#root'));