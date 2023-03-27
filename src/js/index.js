import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/styles.css';
import fetchCountries from './fetchCountries';
import { makeCountryListMarkup, makeCountryCardMarkup } from './renderMarkup';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryBox = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

let selectedCountry = null;

searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
  const countryName = e.target.value.trim();
  const countriesArray = [];

  if (!countryName) {
    cleanMarkup();
    return;
  }
  fetchCountries(countryName)
    .then(countryObj => {
      countryObj.map(country => {
        selectedCountry = country;
        countriesArray.push(country);
      });
      generateMarkup(countriesArray);
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
      cleanMarkup();
    });
}
function generateMarkup(countriesArray) {
  if (countriesArray.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (countriesArray.length >= 2 && countriesArray.length <= 10) {
    countryList.innerHTML = makeCountryListMarkup(countriesArray);
    countryBox.classList.add('hidden');
  } else {
    countryBox.classList.remove('hidden');
    countryList.innerHTML = '';
    countryBox.innerHTML = makeCountryCardMarkup(selectedCountry);
  }
}
function cleanMarkup() {
  countryBox.classList.add('hidden');
  countryList.innerHTML = '';
  countryBox.innerHTML = '';
}
