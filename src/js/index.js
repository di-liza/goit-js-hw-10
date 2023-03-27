import { Notify } from 'notiflix/build/notiflix-notify-aio';
import '../css/styles.css';
import fetchCountries from './fetchCountries';
import { makeCountryListMarkup, makeCountryCardMarkup } from './renderMarkup';

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryBox = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
let countriesArray = [];
let selectedCountry = null;

searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
  const countryName = e.target.value.trim();
  const countriesArray = [];

  if (!countryName) {
    cleanMarkup(countryBox, countryList);
    countryBox.classList.add('hidden');
    return;
  }
  fetchCountries(countryName)
    .then(countryObj => {
      countryObj.map(country => {
        selectedCountry = country;
        countriesArray.push(country);
      });

      generateMarkup(countriesArray, countryList, countryBox);
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
      countryBox.classList.add('hidden');
      cleanMarkup(countryBox, countryList);
    });
}
function generateMarkup(countriesArray, countryList, countryBox) {
  if (countriesArray.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  } else if (countriesArray.length >= 2 && countriesArray.length <= 10) {
    countryList.innerHTML = makeCountryListMarkup(countriesArray);
    countryBox.classList.add('hidden');
  } else {
    countryBox.classList.remove('hidden');
    countryList.innerHTML = '';
    renderCountryCard(selectedCountry);
  }
}
function renderCountryCard(country) {
  countryBox.innerHTML = makeCountryCardMarkup(country);
}
function cleanMarkup(countryBox, countryList) {
  countryList.innerHTML = '';
  countryBox.innerHTML = '';
}
