import React from 'react';

const ViewHandler = props => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        fontSize: '1.5em',
        margin: '1em'
      }}
    >
      <label htmlFor="views">Choose View</label>

      <select onChange={e => props.viewTypeHandler(e)} name="views" id="views">
        <option value="waiterView">Waiter</option>
        <option value="cookView">Cook</option>
        <option value="managerView">Manager</option>
      </select>
    </div>
  );
};

export default ViewHandler;
