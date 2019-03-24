import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const StyledOrders = styled.div`
  // color: palevioletred;
  color: ${props => props.cardTextColor || 'palevioletred'}
  background-color: rgba(0, 0, 0, 0.2);
  margin: ${props => (props.status == 'ready' ? '.2' : '1rem')};
  padding: 1rem;
  border: 1px dashed gray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  font-size: 1rem
    ${props =>
      props.warning &&
      css`
        background-color: rgba(200, 0, 0, 0.1);
      `}
    ${props =>
      props.test &&
      css`
        background-color: rgba(0, 0, 200, 0.1);
      `};
`;

class Orders extends Component {
  render() {
    return this.props.ordersList.filter(this.props.condition).map(el => (
      <StyledOrders
        cardTextColor={this.props.cardTextColor}
        warning={this.props.warning}
        test={this.props.test}
        status={el.status}
        key={el.id}
      >
        <div>ID: {el.id}</div>
        <label htmlFor="table">TABLE no.</label>
        <input
          name="table"
          id="table"
          value={el.table}
          onChange={e => this.props.editOrderFieldHandler(el.id, e)}
        />
        <label htmlFor="status">STATUS</label>
        <select
          name="status"
          id="status"
          value={el.status}
          onChange={e => this.props.editOrderFieldHandler(el.id, e)}
        >
          <option value="new">NEW</option>
          <option value="pending">PENDING</option>
          <option value="ready">READY</option>
          <option value="finished">FINISHED</option>
          <option value="cancelled">CANCELLED</option>
        </select>
      </StyledOrders>
    ));
  }
}

export default Orders;
