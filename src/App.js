import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import Orders from './Orders/Orders';
import NewOrder from './NewOrder/NewOrder';
import Experimental from './Experimental/Experimental';
import ViewHandler from './ViewHandler/ViewHandler';
import { iframeResizer } from 'iframe-resizer';
import ModalView from './ModalView/ModalView';

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
        food: [
          { foodId: 0, name: 'tomatoSoup', quantity: 14 },
          { foodId: 1, name: 'pancakes', quantity: 14 }
        ],
        currentDate: 'Sun Mar 23 2019 12:46:45',
        editMode: false
      },
      {
        id: 2,
        status: 'new',
        table: 16,
        food: [
          { foodId: 2, name: 'cola', quantity: 17 },
          { foodId: 3, name: 'onionSoup', quantity: 17 }
        ],
        currentDate: 'Sun Mar 24 2019 22:58:33',
        editMode: false
      }
    ],
    ordersFood: [
      { orderId: 1, foodId: 0, name: 'tomatoSoup', quantity: 14 },
      { orderId: 1, foodId: 1, name: 'pancakes', quantity: 14 },
      { orderId: 2, foodId: 2, name: 'cola', quantity: 17 },
      { orderId: 2, foodId: 3, name: 'onionSoup', quantity: 17 }
    ],
    currentId: 2,
    viewType: 'waiterView',
    currentModalId: '',
    foodOptions: [
      { foodId: 0, name: 'tomatoSoup' },
      { foodId: 1, name: 'pancakes' },
      { foodId: 2, name: 'cola' },
      { foodId: 3, name: 'onionSoup' },
      { foodId: 4, name: 'dumplings' },
      { foodId: 5, name: 'fanta' }
    ]
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

  viewTypeHandler = e => {
    this.setState({ viewType: e.target.value });
  };

  openModal = id => {
    this.setState({ viewType: 'modalView', currentModalId: id });
  };
  closeModal = id => {
    this.setState({ viewType: 'waiterView', currentModalId: '' });
  };

  incraseFood = foodId => {
    const objectToModify = this.state.ordersList.find(
      obj => obj.id == this.state.currentModalId
    );

    const temporaryOrderList = this.state.ordersList;

    const temporary = temporaryOrderList
      .find(obj => obj.id == objectToModify.id)
      .food.find(el => el.foodId == foodId);

    console.log(objectToModify);

    temporary.quantity += 1;

    console.log(objectToModify);

    // this.setState({...this.state, property: {nestedProperty: "new value"}})

    // this.setState({ ordersList: temporaryOrderList });
  };

  waiterView() {
    return (
      <React.Fragment>
        {/* <Experimental /> */}
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
            openModal={this.openModal}
            ordersFood={this.state.ordersFood}
          />
        </Container>
      </React.Fragment>
    );
  }

  cookView() {
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  managerView() {
    return (
      <React.Fragment>
        {/* <Experimental /> */}
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
      <div>
        {this.state.viewType !== 'modalView' && (
          <ViewHandler viewTypeHandler={this.viewTypeHandler} />
        )}
        {this.state.viewType === 'managerView' && this.managerView()}
        {this.state.viewType === 'cookView' && this.cookView()}
        {this.state.viewType === 'waiterView' && this.waiterView()}
        {this.state.viewType === 'modalView' && (
          <ModalView
            foodOptions={this.state.foodOptions}
            closeModal={this.closeModal}
            ordersList={this.state.ordersList}
            currentModalId={this.state.currentModalId}
            incraseFood={this.incraseFood}
            ordersFood={this.state.ordersFood}
          />
        )}
      </div>
    );
  }
}

export default App;
