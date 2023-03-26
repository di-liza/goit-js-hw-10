const BASE_URL = 'https://restcountries.com/v3.1/';

export default function fetchCountries(name) {
  return fetch(`${BASE_URL}name/${name}?`).then(res => {
    if (!res.ok) {
      throw new Error(response.status);
    }

    return res.json();
  });
}
