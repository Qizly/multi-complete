import React from 'react';

const key = {
  up: 38,
  down: 40
};

const ListItem = ({onClick, onMouseOver, onMouseOut, selected, children}) => (
  <div onClick={onClick} 
    onMouseOver={onMouseOver}
    onMouseOut={onMouseOut} 
    className={selected ? 'selected' : ''} 
  >
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
}

class MultiComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      str: '',
      matches: [],
      selectedIndex: -1
    };

    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  _onChange(e) {
    let str = e.target.value;
    let matches = [];
    let {list} = this.props;

    if (str.length > 0) {
      matches = list.filter(item => item.toLowerCase().indexOf(str.toLowerCase()) !== -1);
    }
    this.setState({ str, matches, selectedIndex: -1 });
  }

  _onKeyDown(e) {
    let keyCode = e.keyCode;
    let selectedIndex = this.state.selectedIndex;

    if (selectedIndex > 0 && keyCode === key.up) {
      
      e.preventDefault();
      this.setState({ 
        selectedIndex: selectedIndex - 1 
      });
      
    } else if (selectedIndex < this.state.matches.length - 1 && keyCode === key.down) {
      
      e.preventDefault();
      this.setState({
        selectedIndex: selectedIndex + 1
      });
      
    } else if (e.key === 'Enter') {
      
      if (selectedIndex !== -1) {
        this.setState({
          str: this.state.matches[selectedIndex],
          matches: []
        });
      }
      e.target.blur();
    }
  }

  _onClick(index) {
    this.setState({
      str: this.state.matches[index],
      matches: []
    });
  }
  
  _onMouseOver(index) {
    this.setState({ selectedIndex: index });
  }
  
  _onMouseOut(index) {
    this.setState({ selectedIndex: -1 });
  }

  render() {
    return (
      <div>
        <input type="text"
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          value={this.state.str}
        />
        <div>
          {this.state.matches.map((item, index) =>
            <ListItem key={item}
              selected={this.state.selectedIndex === index}
              onClick={this._onClick.bind(this, index)}
              onMouseOver={this._onMouseOver.bind(this, index)}
              onMouseOut={this._onMouseOut.bind(this, index)} 
            >
            {item}
            </ListItem>)}
        </div>
      </div>
    );
  }
}

MultiComplete.propTypes = {
  list: React.PropTypes.array.isRequired
};

export default MultiComplete;
