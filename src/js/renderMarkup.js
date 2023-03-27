export { makeCountryListMarkup, makeCountryCardMarkup };

function makeCountryListMarkup(country) {
  return country
    .map(
      country => `<li class="country-list__item">
        <img class="country-list__img" src="${country.flags.svg}" alt="" width="30" height="20">
        <p>${country.name.official}</p>
    </li>`
    )
    .join('');
}
function makeCountryCardMarkup(country) {
  return `<div class="country-name"><img class="flag" src="${
    country.flags.svg
  }" alt="${country.name.common}" width="50" height="50">
    <h2>${country.name.official}</h2>
    </div>
    <p class="capital">Capital: <span class="card-accent">${
      country.capital
    }</span></p>
    <p class="population">Population: <span class="card-accent">${
      country.population
    }</span></p>
    <div class="languages-box">
    <p>Languages:</p>
    <p class="list-group-item"><span class="card-accent">${Object.values(
      country.languages
    ).join(', ')}</span></p>
  </div>`;
}
