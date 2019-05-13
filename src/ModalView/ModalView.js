import React from 'react';

const ModalView = props => {
  return (
    <React.Fragment>
      <div
        style={{
          marginTop: '5em',
          display: 'flex',
          justifyContent: 'space-evenly'
        }}
      >
        <div>
          {props.foodOptions.map(el => (
            <div key={el.foodId}>
              {/* to change to decrase */}
              <button onClick={() => props.incraseFood(el.foodId)}>-</button>
              {el.name}
              {el.foodId}
              <button onClick={() => props.incraseFood(el.foodId)}>+</button>
            </div>
          ))}
        </div>

        <div>
          <ul>
            {props.ordersFood.map(
              obj =>
                obj.orderId == props.currentModalId && (
                  <p key={obj.foodId}>
                    {obj.name}:{obj.quantity}
                  </p>
                )
            )}
          </ul>
          {/* <ul>
            {props.ordersList
              .find(singleOrder => singleOrder.id === props.currentModalId)
              .food.map(item => (
                <li key={item.foodId}>{item.name}</li>
              ))}
          </ul> */}
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button onClick={() => props.closeModal()}>CLOSE</button>
      </div>
    </React.Fragment>
  );
};

export default ModalView;
