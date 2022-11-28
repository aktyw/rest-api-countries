import * as model from './model.js';
import view from './view.js';
import { Transformer } from '@parcel/plugin';

const controlCountries = async function (data) {
  view.generateCountriesMarkup(model.state.countries);
};

const filterRegion = async function ({ target }) {
  try {
    const { value } = target.dataset;
    console.log(value);
  } catch (error) {
    console.log(error);
  }
};

const init = async function () {
  try {
    view.addHandlerFilter(filterRegion);
    view.generateCountriesMarkup(model.state);
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener('click', init)