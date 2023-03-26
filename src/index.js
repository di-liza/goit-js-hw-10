import { Notify } from 'notiflix/build/notiflix-notify-aio';
import './css/styles.css';
import fetchCountries from './fetchCountries';
import countryCardTemplate from './country-card.hbs';
import countryListTemplate from './country-list.hbs';

const debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const searchBox = document.querySelector('#search-box');
const countryBox = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');
let selectedCountry = null;

countryBox.classList.add('hidden');

searchBox.addEventListener('input', debounce(onSearchBoxInput, DEBOUNCE_DELAY));

function onSearchBoxInput(e) {
  const countryName = e.target.value.trim();
  const countriesArray = [];

  if (countryName === '') {
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
      if (countriesArray.length > 10) {
        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        return;
      }
      generateMarkup(countriesArray, countryList, countryBox);
    })
    .catch(err => {
      Notify.failure('Oops, there is no country with that name');
      countryBox.classList.add('hidden');
      cleanMarkup(countryBox, countryList);
    });
}

function generateMarkup(countriesArray, countryList, countryBox) {
  if (countriesArray.length >= 2 && countriesArray.length <= 10) {
    countryBox.classList.remove('hidden');
    const listMarkup = countryListTemplate(countriesArray);
    countryList.innerHTML = listMarkup;
    countryBox.classList.add('hidden');
    return;
  } else if (countriesArray.length === 1) {
    countryBox.classList.remove('hidden');
    countryList.innerHTML = '';
    changeCountryLang(selectedCountry);
    renderCountryCard(selectedCountry);
  }
}

function changeCountryLang(country) {
  const languages = Object.values(country.languages).join(', ');
  const countryWithLanguages = { ...country, languages: languages };
}

function renderCountryCard(country) {
  const markupCountryCard = countryCardTemplate(country);
  countryBox.innerHTML = markupCountryCard;
}
function cleanMarkup(countryBox, countryList) {
  countryList.innerHTML = '';
  countryBox.innerHTML = '';
}
