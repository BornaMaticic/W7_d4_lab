const PubSub = require('../helpers/pub_sub.js');
const RequestHelper = require('../helpers/request_helper.js');

const Munro = function () {
  this.munros = null;
  this.regions;
};

Munro.prototype.getData = function (url) {
  const requestHelper = new RequestHelper(url);
  requestHelper.get((data) => {
    this.munros = data;
    const uniqueRegions = this.makeRegions(this.munros);
    PubSub.publish('Munros:regions', uniqueRegions);
  })
};

Munro.prototype.bindEvents = function () {
  PubSub.subscribe('SelectView:select-region', (evt) => {
    const munroByRegion = this.munroByRegion(evt.detail);
    console.log(this.munros[0].region);
    console.log(evt.detail);
    console.log(munroByRegion);
    PubSub.publish('Munro:munro-by-region',munroByRegion);
  });
};

Munro.prototype.munroByRegion = function (region) {
  const filteredmunros = this.munros.filter((munro) => munro.region === region);
  return filteredmunros;
};


Munro.prototype.makeRegions = function (munros) {
  return munros.map(munro => munro.region)
  .filter((region, index, regions) => regions.indexOf(region) === index);
};

module.exports = Munro;
