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
	  	<ButtonAppBar/>
        <Typography variant="h4" component="h1" gutterBottom>
          iOrders
        </Typography>
		<Container>
			<Box width="50%" bgcolor="grey.300" p={1} my={0.5}>
        		Width 75%
			</Box>
		</Container>	
		<Container>
			<Box width="50%" bgcolor="grey.300" p={1} my={0.5}>
        		Width 75%
			</Box>
		</Container>
        <Copyright />
      </div>
    </Container>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));