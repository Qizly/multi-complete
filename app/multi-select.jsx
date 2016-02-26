import React from 'react';
import Token from './token.jsx';
import ListItem from './list-item.jsx';

const minInputWidth = 20;
const charWidth = 6;
const key = {
  up: 38,
  down: 40,
  delete: 8,
  tab: 9
};

function escapeString(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

class MultiSelect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      str: '',
      matches: [],
      selects: [],
      hoveredIndex: -1
    };

    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(e) {
    let str = e.target.value;
    let matches = [];
    const {list} = this.props;
    const regex = new RegExp('^' + str, 'i');
    
    str = escapeString(str).trim();

    if (str.length > 0) {
      matches = list.filter(item => item.match(regex));
    }

    this.setState({ str, matches, hoveredIndex: -1 });
  }

  onKeyDown(e) {
    const keyCode = e.keyCode;
    const hoveredIndex = this.state.hoveredIndex;
    const matches = this.state.matches;
    const lastIndex = matches.length - 1;
    const selects = this.state.selects;
    const str = this.state.str;

    if (keyCode === key.up) {
      e.preventDefault();
      this.setState({ 
        hoveredIndex: hoveredIndex > 0 ? (hoveredIndex - 1) : lastIndex
      });
      
    } else if (keyCode === key.down || keyCode === key.tab) {
      e.preventDefault();
      this.setState({
        hoveredIndex: hoveredIndex < lastIndex ? (hoveredIndex + 1) : 0
      });
      
    } else if (e.key === 'Enter') {
      if (hoveredIndex !== -1) {
        this.addToList(matches[hoveredIndex]);
      }
    } else if (str.length === 0 && keyCode === key.delete) {
      this.setState({
        selects: selects.slice(0, -1)
      });
    }
  }

  onClick(index) {
    const match = this.state.matches[index];
    this.addToList(match);
  }
  
  onMouseOver(hoveredIndex) {
    this.setState({ hoveredIndex });
  }
  
  onMouseOut() {
    this.setState({ hoveredIndex: -1 });
  }

  onInputContainerClick() {
    this.input.focus();
  }

  handleDelete(item, index) {
    const selects = this.state.selects;
    this.setState({
      selects: selects.slice(0, index).concat(selects.slice(index + 1))
    });
  }

  addToList(item) {
    const selects = this.state.selects;
    this.setState({
      str: '',
      matches: [],
      selects: selects.indexOf(item) === -1 ? [...selects, item] : selects
    }, () => this.input.focus());
  }

  render() {
    const inputStyles = {width: this.state.selects.length > 0 ? this.state.str.length * charWidth + minInputWidth : '90%'};
    return (
      <div className="multi-select-container">
        <div className="multi-select-clickable-box"
          onClick={this.onInputContainerClick.bind(this)} >
          {this.state.selects.map((selectedItem, index) => (
            <Token handleDelete={this.handleDelete.bind(this, selectedItem, index)}
              key={selectedItem}>{selectedItem}</Token>)
          )}
          <input type="text" style={inputStyles} className="multi-select-container-input"
            onChange={this.onChange}
            onKeyDown={this.onKeyDown}
            value={this.state.str}
            ref={ref => this.input = ref}
            placeholder={this.state.selects.length > 0 ? '' : this.props.placeholder}
          />
        </div>

        <div className="tokens">
          {this.state.matches.map((item, index) =>
            <ListItem key={item}
              selected={this.state.hoveredIndex === index}
              onClick={this.onClick.bind(this, index)}
              onMouseOver={this.onMouseOver.bind(this, index)}
              onMouseOut={this.onMouseOut.bind(this, index)}>
              {item}
            </ListItem>)
          }
        </div>
      </div>
    );
  }
}

MultiSelect.propTypes = {
  list: React.PropTypes.array.isRequired
};

export default MultiSelect;
