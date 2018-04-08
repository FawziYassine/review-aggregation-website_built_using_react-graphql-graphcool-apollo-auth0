import React, { Component } from 'react';
import { FormGroup, FormControl, ControlLabel, HelpBlock } from 'react-bootstrap';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Auth from '../Auth/Auth';
import { withRouter } from 'react-router';
import history from '../history';
import '../App.css';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom'

function FieldGroup({ id, label, help, value, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

function Refresh(props){
    return (
  <div>
    <span className="myClass" styles={{float : 'left', paddingRight : '5px'}} >
      <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" ><circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/><path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg>
    </span>
    <p align="center" styles="margin-top: 1em"> <font size="4" face="sans-serif">Movie added successfuly!</font></p>
    <hr/>
    <p align="center" styles="margin-top: 1em"> <font size="4" face="sans-serif">Go <a href="http://localhost:3000/">home.</a></font></p>
  </div>
    )
}

function goTo(route) {
  history.replace(`/`)
}

class CreateMovie extends Component {

  state = {
    description: '',
    imageUrl: '',
    avgRating: 0,
  }

  login() {
    this.props.auth.login();
  }

  render () {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        <h3 className="text-center"> Add Rotten Movie Ratings!</h3>
        <hr/>
        <div className='w-100 pa4 flex justify-center'>

          <div style={{ maxWidth: 400 }} className=''>
            {
            isAuthenticated() && (
            <div>
            <label> Movie Title: </label>
             <p>
            <input
              className='w-100 pa3 mv2'
              value={this.state.description}
              placeholder='Title of the movie'
              type="text"
              onChange={(e) => this.setState({description: e.target.value})}
            />
            </p>
            <label> Movie Cover Image: </label>
            <p>
            <input
              className='w-100 pa3 mv2'
              value={this.state.imageUrl}
              placeholder='Image Url'
              type="text"
              onChange={(e) => this.setState({imageUrl: e.target.value})}
            />
            </p>
            <label> Movie Rating as decided by Popular votes: </label>
            <input
              className='w-100 pa3 mv2'
              value={this.state.avgRating}
              type="number"
              placeholder='Average Rating'
              onChange={(e) => this.setState({avgRating: parseInt(e.target.value)})}
            />

            {this.state.imageUrl &&
              <img src={this.state.imageUrl} role='presentation' className='w-100 mv3' />
            }
            {this.state.description && this.state.imageUrl &&
              <button className='btn btn-info btn-lg' onClick={this.handleMovie}>Add New Movie</button>
            }
            </div>
          )
        }
        {
          !isAuthenticated() && (
                <h4>
                  You are not logged in! Please{' '}
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={this.goTo.bind(this, 'home')}
                  >
                    Log In
                  </a>]
                  {' '}to continue.
                </h4>
            )
        }
          </div>
        </div>
      </div>
    )
  }

  handleMovie = () => {

        const {description, imageUrl, avgRating} = this.state
        this.props.addMovie({ description, imageUrl, avgRating })
          .then(() => {
            {console.log('AAAAAAAAAAAAAAAAA')}
            ReactDOM.render( <Refresh />, document.getElementById('root'));
            {console.log('BBBBBBBBBBB')}
          }
        )
    }
}

const addMutation = gql`
  mutation addMovie($description: String!, $imageUrl: String!, $avgRating: Int!) {
    createMovie(description: $description, imageUrl: $imageUrl, avgRating: $avgRating) {
      id
      description
      imageUrl
      avgRating
    }
  }
`

export default graphql(addMutation, {
  props: ({ ownProps, mutate }) => ({
    addMovie: ({ description, imageUrl, avgRating }) =>
      mutate({
        variables: { description, imageUrl, avgRating },
      })
  })
})(withRouter(CreateMovie))
