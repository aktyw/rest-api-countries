import * as model from './model.js';
import view from './view.js';
import { Transformer } from '@parcel/plugin';

const controlCountries = async function ({ target }) {
  try {
    const { value } = target.dataset;
    await model.getCountries(value);
    view.renderCountries(model.state);
  } catch (error) {
    console.log(error);
  }
};

const controlDetailPage = async function (country) {
  try {
    model.getDetailCountry(country);
    view.renderDetailsCountry(model.state.countryDetail);
  } catch (error) {
    console.log(error);
  }
};

const goBack = async function () {
  try {
    view.renderCountries(model.state);
  } catch (error) {
    console.log(error);
  }
};

const init = async function () {
  try {
    await model.getCountries();
    view.addHandlerFilter(controlCountries);
    view.renderCountries(model.state);
    view.addHandlerDetailPage(controlDetailPage);
    view.addHandlerBack(goBack);
  } catch (error) {
    console.log(error);
  }
};

init();
