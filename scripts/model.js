import { Transformer } from '@parcel/plugin';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

const state = {
  countries: {},
};

const createCountryObject = async function (data) {
  const country = data;
  console.log(country);
};

const loadCountry = async function (data) {};

getJSON(API_URL).then((data) => createCountryObject(data));
