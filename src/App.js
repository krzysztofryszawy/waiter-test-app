import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Orders from './Orders/Orders';
import NewOrder from './NewOrder/NewOrder';

const Container = styled.div`
  padding: 1rem;
  font-size: 1.2rem;
  background: linear-gradient(to right, #536976, #292e49);
  display: flex;
  flex-wrap: wrap;
  min-height: 25vh;
  ${props =>
    props.dark &&
    css`
      background: linear-gradient(to right, #0f2027, #203a43, #2c5364);
    `}
`;

class App extends Component {
  state = {
    ordersList: [
      {
        id: 1,
        status: 'pending',
        table: 12,
        food: { tomatoSoup: 1, pancakes: 1, cola: 1 }
      },
      {
        id: 2,
        status: 'new',
        table: 16,
        food: { onionSoup: 2, dumplings: 2, fanta: 2 }
      }
    ],
    currentId: 2
  }
  ;

  findLastId = () => {
    // console.log(this.state.ordersList.map((x) => x.id).sort().reverse()[0]);
  };

  addCurrentOrder = data => {
    // this.findLastId();
    let temporary = this.state.ordersList;
    temporary.push(data);
    this.setState({ ordersList: temporary, currentId: data.id });
  };

  editOrderFieldHandler = (id, e) => {
    const temporaryOrderList = this.state.ordersList;
    const index = temporaryOrderList.findIndex(x => x.id == id);
    temporaryOrderList[index][e.target.name] = e.target.value;
    this.setState({ ordersList: temporaryOrderList });
  };

  render() {
    return (
      <React.Fragment>
        <Container>
          <NewOrder
            lastId={this.state.currentId}
            changeState={this.changeState}
            addCurrentOrder={this.addCurrentOrder}
          />
        </Container>
        <Container>
          <Orders
            cardTextColor="black"
            condition={x => x.status !== 'finished'}
            ordersList={this.state.ordersList}
            editOrderFieldHandler={this.editOrderFieldHandler}
          />
        </Container>
        <Container>
          <Orders
            cardTextColor="white"
            warning
            condition={x => x.status !== 'finished'}
            ordersList={this.state.ordersList}
            editOrderFieldHandler={this.editOrderFieldHandler}
          />
        </Container>
        <Container>
          <Orders
            cardTextColor="gray"
            test
            condition={x => x.status !== 'finished'}
            ordersList={this.state.ordersList}
            editOrderFieldHandler={this.editOrderFieldHandler}
          />
        </Container>
        <Container dark>
          <Orders
            condition={x => x.status === 'finished'}
            ordersList={this.state.ordersList}
            editOrderFieldHandler={this.editOrderFieldHandler}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
