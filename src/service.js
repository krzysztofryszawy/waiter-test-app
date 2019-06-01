import React, { Component } from 'react';
import axios from './axios-instance';

class Service extends Component {
  getSomething() {
    console.log('WORKING!!!');
    axios
      .get('/something.json')
      .then(response => {
        console.log(response);
        // this.setState({ something: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  saveSomething = () => {
    axios
      .put('/something.json', this.state.foodOptions)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return <div>asd</div>;
  }
}

export default Service;
