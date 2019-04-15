import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Orders from './Orders/Orders';
import NewOrder from './NewOrder/NewOrder';
import Experimental from './Experimental/Experimental';
import { iframeResizer } from 'iframe-resizer';

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
        food: { tomatoSoup: 1, pancakes: 1, cola: 1 },
        currentDate: 'Sun Mar 23 2019 12:46:45',
        editMode: false
      },
      {
        id: 2,
        status: 'new',
        table: 16,
        food: { onionSoup: 2, dumplings: 2, fanta: 2 },
        currentDate: 'Sun Mar 24 2019 22:58:33',
        editMode: false
      }
    ],
    currentId: 2
  };

  addCurrentOrder = data => {
    let temporary = this.state.ordersList;
    temporary.push(data);
    this.setState({ ordersList: temporary, currentId: data.id });
  };

  editOrderFieldHandler = (id, e) => {
    const temporaryOrderList = this.state.ordersList;
    const index = temporaryOrderList.findIndex(x => x.id === id);
    temporaryOrderList[index][e.target.name] = e.target.value;
    temporaryOrderList[index].editMode = false;
    if (
      temporaryOrderList[index].status === 'cancelled' ||
      temporaryOrderList[index].status === 'finished'
    ) {
      temporaryOrderList[index].editMode = false;
    }
    this.setState({ ordersList: temporaryOrderList });
  };

  editModeHandler = (id, e) => {
    const temporaryOrderList = this.state.ordersList;
    const index = temporaryOrderList.findIndex(x => x.id === id);
    temporaryOrderList[index].editMode = !temporaryOrderList[index].editMode;
    this.setState({ ordersList: temporaryOrderList });
  };

  render() {
    // iframeResizer({
    //   log: true,
    //   initCallback: () => {
    //     console.log('ready!');
    //   },
    //   resizedCallback: () => {
    //     console.log('resized!');
    //   }
    // });

    return (
      <React.Fragment>
        <Experimental />
        <Container>
          <NewOrder
            lastId={this.state.currentId}
            changeState={this.changeState}
            addCurrentOrder={this.addCurrentOrder}
          />
        </Container>
        <Container>
          <Orders
            // warning
            // bold
            cardTextColor="white"
            condition={x => x.status !== 'finished' && x.status !== 'cancelled'}
            ordersList={this.state.ordersList}
            editOrderFieldHandler={this.editOrderFieldHandler}
            editModeHandler={this.editModeHandler}
          />
        </Container>
        <Container dark>
          <Orders
            condition={x => x.status === 'finished' || x.status === 'cancelled'}
            ordersList={this.state.ordersList}
            editOrderFieldHandler={this.editOrderFieldHandler}
          />
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
