import React from 'react';
import classNames from 'classnames/bind';

const key = {
  up: 38,
  down: 40
};

class ListItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hovered: false
    };
  }

  _onClick() {
    this.props.handleClick();
  }

  _onMouseOver() {
    this.setState({ hovered: true });
  }

  _onMouseOut() {
    this.setState({ hovered: false });
  }

  render() {
    let classes = classNames({
      'selected': this.props.selected,
      'hovered': this.state.hovered
    });

    return (
      <div onClick={this._onClick.bind(this)}
           onMouseOver={this._onMouseOver.bind(this)}
           onMouseOut={this._onMouseOut.bind(this)}
           className={classes}>
        {this.props.children}
      </div>
    );
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

    if (str.length > 0) {
      matches = this.props.list.filter(item =>
        item.toLowerCase().indexOf(str.toLowerCase()) !== -1);
    }

    this.setState({ str, matches, selectedIndex: -1 });
  }

  _onKeyDown(e) {
    let keyCode = e.keyCode;
    let selectedIndex = this.state.selectedIndex;

    if (selectedIndex > 0 && keyCode === key.up) {
      e.preventDefault();
      this.setState({ selectedIndex: selectedIndex - 1 });
    } else if (selectedIndex < this.state.matches.length - 1 && keyCode === key.down) {
      e.preventDefault();
      this.setState({ selectedIndex: selectedIndex + 1 });
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

  handleClick(index) {
    this.setState({
      str: this.state.matches[index],
      matches: []
    });
  }

  render() {
    return (
      <div>
        <input type="text"
          onChange={this._onChange}
          onKeyDown={this._onKeyDown}
          onClick={this._onClick}
          value={this.state.str}
        />
        <div>
          {this.state.matches.map((item, index) =>
            <ListItem key={item}
              selected={this.state.selectedIndex === index}
              handleClick={this.handleClick.bind(this, index)} >
              {item}
            </ListItem>)}
        </div>
      </div>
    );
  }
}

export default MultiComplete;
