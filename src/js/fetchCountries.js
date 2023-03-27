const BASE_URL = 'https://restcountries.com/v3.1/';
const options = 'fields=name,capital,population,flags,languages';

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}name/${name}?${options}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
