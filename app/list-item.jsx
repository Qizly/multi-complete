import React from 'react';

const ListItem = ({onClick, onMouseOver, onMouseOut, selected, children}) => (
  <div onClick={onClick}
       onMouseOver={onMouseOver}
       onMouseOut={onMouseOut}
       className={selected ? 'selected' : ''}>
    {children}
  </div>
);

ListItem.propTypes = {
  onClick: React.PropTypes.func.isRequired,
  onMouseOver: React.PropTypes.func.isRequired,
  onMouseOut: React.PropTypes.func.isRequired,
  selected: React.PropTypes.bool.isRequired,
  children: function (props, propName, componentName) {
    let prop = props[propName];

    if (React.Children.count(prop) !== 1 || typeof prop !== 'string') {
      return new Error(
        `\`${componentName}\` should have a single child of type string`
      );
    }
  }
};

export default ListItem;
