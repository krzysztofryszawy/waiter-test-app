import React from 'react';

const ViewHandler = props => {
  return (
    <div>
      <label htmlFor="views">Choose View</label>

      <select onChange={e => props.viewTypeHandler(e)} name="views" id="views">
        <option value="managerView">Manager</option>
        <option value="cookView">Cook</option>
        <option value="waiterView">Waiter</option>
      </select>
    </div>
  );
};

export default ViewHandler;
