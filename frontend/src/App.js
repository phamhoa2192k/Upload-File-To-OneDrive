
import './App.css';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container } from 'reactstrap';
import Welcome from './Welcome';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      isAuthenticated: false,
      user: null
    }
  }

  login(){

  }

  logout(){

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
            <Container>
              <Route exact path="/"
                render={(props) =>
                  <Welcome {...props}
                    isAuthenticated={this.state.isAuthenticated}
                    user={this.state.user}
                    authButtonMethod={this.login} />
                } />
            </Container>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
