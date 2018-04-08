import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import './App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
        <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
            </div>
            <ul class="nav navbar-nav navbar-right">
              <li>
                <Button
                bsStyle="primary"
                className="btn btn-info log"
                onClick={this.goTo.bind(this, 'home')}
                >
                Home
                </Button>
              </li>
            {
              !isAuthenticated() && (
                  <li>
                    <Button
                      id="qsLoginBtn"
                      bsStyle="primary"
                      className="btn btn-info log"
                      onClick={this.login.bind(this)}
                    >
                      Log In
                    </Button>
                  </li>
                )
            }
            {
              isAuthenticated() && (
                  <li>
                    <Button
                      id="qsLogoutBtn"
                      bsStyle="danger pull-right"
                      className="btn btn-danger log"
                      onClick={this.logout.bind(this)}
                    >
                      Log Out
                    </Button>
                </li>
                )
            }
              </ul>
            </div>
          </nav>
        </div>
      );
  }
}

export default App;
