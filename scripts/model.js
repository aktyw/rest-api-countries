import { Transformer } from '@parcel/plugin';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {};

const createCountryObject = function (data) {
  const country = data;
  return {
    name: country.name,
    capital: country.capital,
    borders: country.borders,
    languages: country.languages,
    population: country.population,
    flags: country.flags,
    currencies: country.currencies,
    region: country.region,
    subregion: country.subregion,
  };
};

const loadCountry = async function () {};

const filterRegion = async function (region) {
  try {
    const url = `${API_URL}/region/${region}`;
    const data = await getJSON(url);
    state.countries = data.map((d) => createCountryObject(d));
  } catch (error) {
    console.log(error);
  }
};

const init = async function () {
  try {
    const url = `${API_URL}/all`;
    const data = await getJSON(url);
    state.countries = data.map((d) => createCountryObject(d));
    // console.table(
    //   state.countries.forEach(({ name, capital }, i) => {
    //     console.log(name, capital);
    //   })
    // );
  } catch (error) {
    console.log(error);
  }
};

init();
// https://restcountries.com/v3.1/region/{region}
