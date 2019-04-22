import React, { Component } from 'react';
import styled from 'styled-components';

const StyledNewOrder = styled.div`
  color: orange;
  background-color: rgba(0, 0, 0, 0.4);
  margin: 1rem;
  padding: 1rem;
  border: 1px dashed gray;
  border-radius: 5px;
`;

class NewOrder extends Component {
  state = {
    id: this.props.lastId + 1,
    status: 'new',
    table: '',
    food: [{ onionSoup: 5 }, { dumplings: 5 }, { fanta: 5 }],
    currentDate: '',
    editMode: false
  };

  changeState = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  sendData = () => {
    const currentDate = new Date();
    this.setState({ currentDate: currentDate.toString().slice(0, 24) }, () => {
      this.props.addCurrentOrder(this.state);
      this.setState({
        id: +this.state.id + 1,
        status: 'new',
        table: '',
        editMode: false
      });
    });
  };

  render() {
    return (
      <StyledNewOrder>
        <span>ID</span>
        <input value={this.state.id} name="id" type="text" readOnly />
        <span>STATUS </span>
        <select
          name="status"
          value={this.state.status}
          onChange={this.changeState}
        >
          <option value="new">NEW</option>
          <option value="pending">PENDING</option>
          <option value="ready">READY</option>
          <option value="finished">FINISHED</option>
          <option value="cancelled">CANCELLED</option>
        </select>
        <span>TABLE no. </span>
        <input
          value={this.state.table}
          name="table"
          type="text"
          onChange={this.changeState}
        />
        <button onClick={this.sendData}>PUSH</button>
      </StyledNewOrder>
    );
  }
}

export default NewOrder;
