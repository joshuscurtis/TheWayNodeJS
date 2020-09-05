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
			</MenuIcon>
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
          CDN v4-beta example
        </Typography>
        <Copyright />
      </div>
    </Container>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));