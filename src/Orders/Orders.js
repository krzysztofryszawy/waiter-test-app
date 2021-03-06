import React, { Component } from 'react';
import styled, { css } from 'styled-components';

const StyledOrders = styled.div`
  // color: palevioletred;
  color: ${props => props.cardTextColor || 'palevioletred'};
  background-color: rgba(0, 0, 0, 0.2);
  margin: 1rem;
  padding: 1rem;
  border: 1px dashed gray;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  font-size: 1rem
    ${props =>
      props.warning &&
      css`
        font-size: 1.5rem;
        color: red;
      `}
    ${props =>
      props.bold &&
      css`
        font-weight: bold;
      `};
  ${props =>
    props.status === 'cancelled' &&
    css`
      background-color: rgba(255, 0, 0, 0.2);
    `};
  ${props =>
    props.status === 'ready' &&
    css`
      background-color: rgba(0, 255, 0, 0.2);
    `};
  ${props =>
    props.status === 'pending' &&
    css`
      background-color: rgba(0, 0, 255, 0.1);
    `};
`;
class Orders extends Component {
  render() {
    // Destructuring Props
    const {
      ordersList,
      condition,
      cardTextColor,
      warning,
      bold,
      status,
      id,
      editModeHandler,
      editOrderFieldHandler,
      ordersFood,
      openModal,
      viewType
    } = this.props;

    return ordersList
      .filter(condition)
      .reverse()
      .map(el => (
        <StyledOrders
          cardTextColor={cardTextColor}
          warning={warning}
          bold={bold}
          status={el.status}
          key={el.id}
        >
          {el.status !== 'finished' && el.status !== 'cancelled' && (
            <button onClick={e => editModeHandler(el.id, e)}>EDIT</button>
          )}
          <p>{el.currentDate && el.currentDate}</p>
          <label htmlFor="table">TABLE no.</label>
          {el.editMode ? (
            <input
              name="table"
              id="table"
              value={el.table}
              onChange={e => editOrderFieldHandler(el.id, e)}
            />
          ) : (
            <div>{el.table}</div>
          )}

          <label htmlFor="status">STATUS</label>
          {el.editMode ? (
            <select
              key={el.id}
              name="status"
              id="status"
              value={el.status}
              onChange={e => editOrderFieldHandler(el.id, e)}
            >
              <option value="new">NEW</option>
              <option value="pending">PENDING</option>
              <option value="ready">READY</option>
              <option value="finished">FINISHED</option>
              <option value="cancelled">CANCELLED</option>
            </select>
          ) : (
            <div>{el.status}</div>
          )}

          <ul>
            {ordersFood.map(
              item =>
                item.orderId == el.id && (
                  <li key={item.foodId}>
                    {item.name}: {item.quantity}
                  </li>
                )
            )}
          </ul>
          {viewType === 'managerView' || (
            <button onClick={() => openModal(el.id)}>MODAL</button>
          )}
        </StyledOrders>
      ));
  }
}

export default Orders;
