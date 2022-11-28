import { Transformer } from '@parcel/plugin';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  countries: '',
  countryDetail: '',
};

const createCountryObject = function (data) {
  const country = data;
  // console.log(country);
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
    domain: country.tld,
    shortname: country.cca3,
  };
};

export const getDetailCountry = function (name) {
  const dataCountry = state.countries.find(
    (country) => country.name.common === name.textContent
  );
  state.countryDetail = dataCountry;
};

export const getCountries = async function (region = 'all') {
  try {
    let url = `${API_URL}/region/${region}`;
    if (region === 'all') {
      url = `${API_URL}/all`;
    }
    const data = await getJSON(url);
    state.countries = data.map((country) => createCountryObject(country));
  } catch (error) {
    console.log(error);
  }
};
