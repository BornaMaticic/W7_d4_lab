const Munro = require('./models/munro.js');
const MunroView = require('./views/munro_view.js');
const SelectView = require('./views/select_view.js');

document.addEventListener('DOMContentLoaded', () => {
  console.log('JavaScript Loaded');

  const munro = new Munro;
  munro.getData('https://munroapi.herokuapp.com/api/munros');
  munro.bindEvents();

  const container = document.querySelector('.munros');
  const munroView = new MunroView(container);
  munroView.bindEvents();
  const selectView = new SelectView();
  selectView.bindEvents();
})
