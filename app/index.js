import './main.css';
import React from 'react';
import ReactDOM from 'react-dom'
import MultiSelect from './multi-select.jsx';

var list = ['Andy', 'Arlene', 'Billy', 'Bob', 'Candy', 'Daisy', 'Harry', 'Inga', 'Julie', 'Larry', 'Laura', 'Mindy', 'Paul', 'Remi', 'Sheena', 'Tom', 'Tina', 'Zeke'];

main();

function main() {
    ReactDOM.render(<MultiSelect list={list} />, document.getElementById('app'));
}