import './App.css';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import { Container } from 'reactstrap';
import Welcome from './Welcome';
import React from 'react';
import Cookie from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.css';
import File from './File'
const SERVER_DOMAIN = "http://localhost:3001"
class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      user: null,
      uniqueId: Cookie.get("uniqueId")
    }
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.getUser = this.getUser.bind(this)
  }

  componentDidMount() {
    if (this.state.uniqueId && this.state.user == null) {
      this.getUser(this.state.uniqueId)
    }
  }

  getUser(uniqueId) {
    fetch(`${SERVER_DOMAIN}/user/get-user?uniqueId=${uniqueId}`)
      .then(res => res.json())
      .then(json => {
        if (json != null)
          this.setState({
            ...this.state,
            user: json,
            isAuthenticated: true
          })
      })
      .catch(console.log)
  }

  login() {
    fetch(`${SERVER_DOMAIN}/signin`)
      .then(res => res.json())
      .then(res => window.location.href = res)
  }

  logout() {
    fetch(`${SERVER_DOMAIN}/logout`)
      .then(console.log)
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <NavBar
              isAuthenticated={this.state.isAuthenticated}
              authButtonMethod={this.state.isAuthenticated ? this.logout : this.login}
              user={this.state.user} />
          </div>
          <Container>
          <Route exact path="/file">
            <File isAuthenticated={this.state.isAuthenticated}/>
          </Route>

          <Route exact path="/">
            <Welcome
                isAuthenticated={this.state.isAuthenticated}
                user={this.state.user}
                authButtonMethod={this.login} />
          </Route>
        </Container>
        </Router>
      </div>
    );
  }
}

export default App;
