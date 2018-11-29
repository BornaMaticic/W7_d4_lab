const PubSub = require('../helpers/pub_sub.js');


const SelectView = function () {
  this.element;
}

SelectView.prototype.bindEvents = function () {
  this.element = document.querySelector('#mountains');
  PubSub.subscribe('Munros:regions', (event) => {
    this.populate(event.detail);
  })
  this.element.addEventListener('change', (event) => {
    event.preventDefault();
    const region = event.target.value;
    PubSub.publish('SelectView:select-region', region);
  });
};

SelectView.prototype.populate = function (regions) {
  for (region of regions) {
    const option = this.createCustomElement('option', 'textContent', region)
    this.element.appendChild(option);
  }
};

SelectView.prototype.createCustomElement = function (type, attr, data) {
  const element = document.createElement(type);
  element[attr] = data;
  return element;
};


module.exports = SelectView;
