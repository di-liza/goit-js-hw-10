import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import fetchCountries from './fetchCountries';
import cardTmp from './country-card.hbs';
import listTpm from './country-list.hbs';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countryBox = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
let countryEl = null;
countryBox.classList.add('hidden');

searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
  console.log(e.target.value);
  const countryName = e.target.value.trim();
  const countriesArray = [];

  if (countryName === '') {
    countryBox.innerHTML = '';
    countryList.innerHTML = '';
    countryBox.classList.add('hidden');
    return;
  }

  fetchCountries(countryName)
    .then(countryObj => {
      countryObj.map(country => {
        countryEl = country;
        countriesArray.push(country);
        console.log(countriesArray.length);
      });
      if (countriesArray.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      if (countriesArray.length >= 2 && countriesArray.length <= 10) {
        countryBox.classList.remove('hidden');
        const listMarkup = listTpm(countriesArray);
        countryList.innerHTML = listMarkup;
        countryBox.classList.add('hidden');
        return;
      }
      if (countriesArray.length === 1) {
        countryBox.classList.remove('hidden');
        countryList.innerHTML = '';
        sortCountryLang(countryEl);
        renderCountryCard(countryEl);
      }
    })
    .catch(err => {
      Notify.failure('error');
      countryBox.classList.add('hidden');
      countryList.innerHTML = '';
      countryBox.innerHTML = '';
    });
}

function checkInput(countriesArray) {
  if (countriesArray.length > 10 && !isTooManyMatchesFound) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (countriesArray.length >= 2 && countriesArray.length <= 10) {
    const listMarkup = listTpm(countriesArray);
    countryList.innerHTML = listMarkup;
    return;
  }
}

function sortCountryLang(country) {
  const languages = Object.values(country.languages).join(', ');
  const countryWithLanguages = { ...country, languages: languages };
}

function renderCountryCard(country) {
  const markupCountryCard = cardTmp(country);
  countryBox.innerHTML = markupCountryCard;
}
function cleanMarkup(countryBox, countryList) {}
