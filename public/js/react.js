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
  Grid
} = MaterialUI;



function ButtonAppBar() {

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
			<Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
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

function App() {
  return (
   <Container maxWidth="lg">
     <div style={{ marginTop: 24, }}>
	  <Grid container spacing={3}>
        <Grid item xs={12}>
			<ButtonAppBar/>
        </Grid>
        <Grid item xs={6}>
        	<Typography variant="h4" component="h1" gutterBottom>
          		Left
	  		</Typography>
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
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));