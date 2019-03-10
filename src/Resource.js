import React, { Component } from 'react';

class Resource extends Component {
  state = {
    visible: false,
    distances: [1, 22, 34, 5534, 24, 234, 224, 44, 5],
    name: ['adam', 'monika', 'ania', 'piotr']
  };

  isVisible = () => {
    this.setState({ visible: !this.state.visible });
    console.log(this.state.visible);
  };

  render() {
    return this.props.wonderland(this.state, this.isVisible);
  }
}

export default Resource;
