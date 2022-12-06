import { Transformer } from '@parcel/plugin';
import { API_URL } from './config.js';
import { getJSON } from './helpers.js';

export const state = {
  allCountries: '',
  countries: '',
  searchCountries: '',
  countryDetail: '',
  darkmode: false,
};

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
    domain: country.tld,
    shortname: country.cca3,
  };
};

export const toggleDarkMode = function () {
  !state.darkmode ? (state.darkmode = true) : (state.darkmode = false);
};

export const getDetailCountry = function (name) {
  const dataCountry = state.allCountries.find(
    (country) => country.name.common === name.textContent
  );
  state.countryDetail = dataCountry;
};

export const getAllCountries = async function () {
  const data = await getJSON(`${API_URL}/all`);
  state.allCountries = data.map((country) => createCountryObject(country));
};

export const getSearchCountries = function (data) {
  state.searchCountries = Object.values(state.countries).filter((country) => {
    return country.name.common.toLowerCase().includes(data);
  });
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
