import * as model from './model.js';
import view from './view.js';
import { Transformer } from '@parcel/plugin';

const controlCountries = async function ({ target }) {
  try {
    const { value } = target.dataset;
    await model.getCountries(value);
    view.generateCountriesMarkup(model.state);
    console.log(value);
  } catch (error) {
    console.log(error);
  }
};

const init = async function () {
  try {
    await model.getCountries();
    view.addHandlerFilter(controlCountries);
    view.generateCountriesMarkup(model.state);
  } catch (error) {
    console.log(error);
  }
};

init();
