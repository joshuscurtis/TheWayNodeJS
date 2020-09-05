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
			<CardHeader title="Order: "{props.orderid} subheader={props.time}>
			</CardHeader>
			<CardContent>
				<OrderItem qty="1" itemName="Item 1"/>
				<OrderItem qty="2" itemName="Item 2"/>
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


function App() {
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
					<CardApp orderid="99" time="5 mins 45 secs"/>
		        </Grid>
		        <Grid item xs={6} spacing={3}>
		        	<Typography variant="h4" component="h1" gutterBottom>
		          		Right
			  		</Typography>
					<CardApp orderid="99" time="5 mins 45 secs"/>
		        </Grid>
				<Grid item xs={12}>
			  	</Grid>
			</Grid>
  </Container>
</div>
  );}

ReactDOM.render(<App />, document.querySelector('#root'));