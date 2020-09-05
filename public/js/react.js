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
  CardContents,
  CardActions,
} = MaterialUI;



function ButtonAppBar() {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
			<Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
	<Card variant="outlined">			
		<Copyright />
	</Card>
    </div>
  );
}


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function Me() {
	return (
			<Card variant="outlined">
	 		</Card>
	);
}




function App() {
  return (
	<Container maxWidth="lg">
    	<div style={{ marginTop: 2, }}>
			<Grid container spacing={3}>
		        <Grid item xs={12}>
					<ButtonAppBar/>
					<Typography variant="h4" component="h1" gutterBottom>
		          		iOrders
			  		</Typography>
		        </Grid>
		        <Grid item xs={6}>
		        	<Typography variant="h4" component="h1" gutterBottom>
		          		Left
			  		</Typography>
					<Card variant="outlined">			
						<Copyright />
					</Card>
		        </Grid>
		        <Grid item xs={6}>
		        	<Typography variant="h4" component="h1" gutterBottom>
		          		Right
			  		</Typography>
		        </Grid>
				<Grid item xs={12}>
					<Copyright />
			  	</Grid>
			</Grid>
   		</div>
  </Container>
  );}

ReactDOM.render(<App />, document.querySelector('#root'));