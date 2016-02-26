import React from 'react';

const Token = ({handleDelete, children}) => (
  <div className="token">
    <span className="delete-icon" onClick={handleDelete}></span>
    {children}
  </div>
);

Token.propTypes = {
  handleDelete: React.PropTypes.func.isRequired,
  children: React.PropTypes.string.isRequired
};

export default Token;
