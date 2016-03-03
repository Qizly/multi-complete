import './main.css';
import React from 'react';
import ReactDOM from 'react-dom'
import MultiSelect from './multi-select.jsx';

// Test data
var list = ['Andy', 'Arlene', 'Billy', 'Bob', 'Candy', 'Daisy', 'Harry', 'Inga', 'Julie', 'Larry', 'Laura', 'Mindy', 'Paul', 'Remi', 'Sheena', 'Tom', 'Tina', 'Zeke'];

main();

function main() {
  ReactDOM.render(<MultiSelect list={list} placeholder="Enter a term to search..." />, document.getElementById('app'));
}
