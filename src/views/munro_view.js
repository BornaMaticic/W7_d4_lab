const PubSub = require('../helpers/pub_sub.js');

const MunroView = function (container) {
  this.container = container;
  this.allMunros = [];
}

MunroView.prototype.bindEvents = function () {

  PubSub.subscribe('Munro:munro-by-region', (evt) => {

    this.allMunros = evt.detail;
    console.log(this.allMunros);
    this.container.innerHTML = '';
    this.render(this.allMunros);
  })

};

MunroView.prototype.render = function (munros) {
    munros.forEach((munro) => {

    const munroDivider = document.createElement('div');

    munroDivider.appendChild(this.createCustomElement('h2', 'textContent', munro.name));

    const unorderedlist = document.createElement('ul');
    const meaning = this.createCustomElement('li', 'textContent', `Meaning: ${munro.meaning}`);
    const height = this.createCustomElement('li', 'textContent', `Height: ${munro.height} meters`);
    unorderedlist.appendChild(meaning);
    unorderedlist.appendChild(height);

    munroDivider.appendChild(unorderedlist);

    this.container.appendChild(munroDivider);
  });
};

MunroView.prototype.createCustomElement = function ( type, attr, data) {
  const element = document.createElement(type);
  element[attr] = data;
  return element;
};

module.exports = MunroView;
