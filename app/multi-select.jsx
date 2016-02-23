import React from 'react';

const key = {
  up: 38,
  down: 40
};

function escapeString(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
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

/**
 * onClick: 
 * @type {Object}
 */
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


const Token = ({handleDelete, children}) => (
  <div style={{float:'left'}} className="token">
    <span className="delete-icon" onClick={handleDelete} style={{display:'inline-block', cursor:'pointer'}}></span>
    {children}
  </div>
);

class MultiComplete extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      str: '',
      matches: [],
      selects: [],
      selectedIndex: -1
    };

    this._onChange = this._onChange.bind(this);
    this._onKeyDown = this._onKeyDown.bind(this);
  }

  _onChange(e) {
    let str = e.target.value;
    let matches = [];
    let {list} = this.props;
    const regex = new RegExp('^' + str, 'i');
    
    str = escapeString(str).trim();

    if (str.length > 0) {
      matches = list.filter(item => item.match(regex));
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
    let match = this.state.matches[index];

    this.setState({
      str: '',
      matches: [],
      selects: this.state.selects.indexOf(match) === -1 ? [...this.state.selects, match] : this.state.selects
    }, () => this._input.focus());
  }
  
  _onMouseOver(index) {
    this.setState({ selectedIndex: index });
  }
  
  _onMouseOut(index) {
    this.setState({ selectedIndex: -1 });
  }

  _onInputContainerClick() {
    this._input.focus();
  }

  handleDelete(item, index) {
    this.setState({
      selects: this.state.selects.slice(0, index).concat(this.state.selects.slice(index + 1))
    });
  }

  render() {
    const styles = {position:'relative', font:'14px "Helvetica Neue", Helvetica, Arial, sans-serif'};
    return (
      <div style={styles} >
        <div onClick={this._onInputContainerClick.bind(this)}
             style={{width:300, border:'1px solid #ddd', cursor:'text', float:'left'}}>
          {this.state.selects.map((selectedItem, index) => <Token handleDelete={this.handleDelete.bind(this, selectedItem, index)} key={selectedItem}>{selectedItem}</Token>)}
          <input type="text" style={{border:'none', outline:'none', padding:'2px 8px', fontSize:14, width:30}}
            onChange={this._onChange}
            onKeyDown={this._onKeyDown}
            value={this.state.str}
            ref={ref => this._input = ref}
          />
        </div>

        <div style={{position:'absolute', top:40, width:300}}>
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
