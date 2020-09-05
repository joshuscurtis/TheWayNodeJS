const {
  colors,
  CssBaseline,
  ThemeProvider,
  Typography,
  Container,
  Box,
  SvgIcon,
  Link,
} = MaterialUI;


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
    <Container maxWidth="sm">
      <div style={{ marginTop: 24, }}>
        <Typography variant="h4" component="h1" gutterBottom>
          CDN v4-beta example
        </Typography>
        <Copyright />
      </div>
    </Container>
  );
}

ReactDOM.render(<App />, document.querySelector('#root'));