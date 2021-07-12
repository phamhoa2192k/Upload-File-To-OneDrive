import './App.css';
import NavBar from './NavBar';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'reactstrap';
import Welcome from './Welcome';
import React from 'react';
import Cookies from 'js-cookie'
import 'bootstrap/dist/css/bootstrap.css';
import File from './File'
const BACKEND = "http://localhost:3001"

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isAuthenticated: false,
      user: null,
      accessToken: Cookies.get("accessToken"),
      files: []
    }
  }

  componentDidMount() {
    if (this.state.accessToken && this.state.user == null) {
      this.getUser(this.state.accessToken)
    }
    if (this.state.accessToken && this.state.user) { }
    this.getFile("")
  }

  getUser = () => {
    fetch(`${BACKEND}/user/get-user`, {
      method: "GET",
      credentials: 'include'
    })
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

  getFile = (path) => {
    fetch(`${BACKEND}/file`)
      .then(res => res.json())
      .then(json => this.setState({
        ...this.state,
        files: json.sort(sortByDatetime)
      }))
      .catch(console.log)
  }

  uploadFile = (file) => {
    let reader = new FileReader()
    let form = new FormData()
    form.append(file.name, file)

    // send to Nodejs
    fetch(`${BACKEND}/file/upload`, {
      method: "POST",
      body: form
    })
      .then(res => res.json())
      .then(json => this.setState({
        ...this.state,
        files: json.sort(sortByDatetime)
      }))
      .catch(console.log);

    // send to Onedrive
    reader.onload = function () {
      let arrayBuffer = this.result;
      let array = new Uint8Array(arrayBuffer);
      console.log(array)
      fetch(`${BACKEND}/graph?filename=${file.name}`, {
        method: "put",
        headers:{
          "Content-Type":"application/octet-stream"
        },
        body: array,
        credentials: "include"
      })
        .then(console.log)
        .catch(console.log)
    }
    reader.readAsArrayBuffer(file)

  }


  downloadFile = (id) => {

  }

  login = () => {
    fetch(`${BACKEND}/auth/signin`, {
      method: "GET"
    })
      .then(res => res.json())
      .then(res => window.location.href = res)
  }

  logout = () => {
    fetch(`${BACKEND}/auth/signout`)
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
              <File isAuthenticated={this.state.isAuthenticated} uploadFile={this.uploadFile} downloadFile={this.downloadFile} files={this.state.files} />
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

function sortByDatetime(a, b) {
  a = new Date(a.time)
  b = new Date(b.time)
  if (a > b) {
    return -1
  }
  else if (a == b) {
    return 0
  }
  else return 1
}
