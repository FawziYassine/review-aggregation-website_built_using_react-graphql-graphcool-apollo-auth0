import React, { Component } from 'react';
import DisplayMovie from './DisplayMovie'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import San_Marzano_tomatoes from '../San_Marzano_tomatoes_logo.svg'

import '../App.css';

class Home extends Component {

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
      <div>
        <nav class="navbar navbar">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="/"><img src={San_Marzano_tomatoes} alt="San_Marzano_tomatoes"/></a>
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
        <div className="container">
        {
          isAuthenticated() && (
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/create">Add New Movies</Link>
              </li>
            </ul>
            )
        }
        {
          !isAuthenticated() && (

            <div>
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
              </div>
            )
        }

        {this.props.data.loading && (
          <div>Loading Movies...</div>
        )
      }

        <h3 className="text-center"> Latest Rotten Movie Ratings!</h3>
            <hr/>
            <div className="col-sm-12">
              {this.props.data.allMovies && this.props.data.allMovies.map((movie, index) => (
                <div className="col-sm-4" key={index}>
                  <DisplayMovie key={movie.id} movie={movie} refresh={() => this.props.data.refetch()} />
                </div>
              ))}
            </div>
          </div>
        </div>
    );
  }
}

const FeedQuery = gql`query allMovies {
  allMovies(orderBy: createdAt_DESC) {
    id
    description
    imageUrl
    avgRating
  }
}`

export default graphql(FeedQuery)(Home)
