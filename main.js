// Select elements
const inputSearch = document.querySelector('#input-search');
const btnSearch = document.querySelector('#btn-search');
const resultBox = document.querySelector('.results-box');
const resultInnerBox = document.querySelector('.results-inner-box');
const countryFlag = document.querySelector('.country-flag');
const countryHeader = document.querySelector('.country-header');
const countryInfo = document.querySelector('.country-info');
const errorMessage = document.querySelector('.error-message');
const spinner = document.querySelector('#spinner');

// API call
const getCountry = async function (cntry) {
  resultBox.classList.add('hidden');
  spinner.removeAttribute('class');

  try {
    const response = await axios.get(
      `https://restcountries.eu/rest/v2/name/${cntry}?fullText=true`
    );
    createSearchResult(response.data[0]);
  } catch (error) {
    showError();
  }

  spinner.setAttribute('class', 'hideSpinner');
};

// returns all currencies as string
const currencies = currency =>
  currency
    .map((curr, i, arr) => {
      return i + 1 < arr.length ? `${curr.name}'s and` : `${curr.name}'s`;
    })
    .join(' ');

// Returns string with spoken languages
const languages = language =>
  language
    .map((lang, i, arr) => {
      if (i + 1 === arr.length) return `${lang.name}`;
      if (i + 1 === arr.length - 1) return `${lang.name} and `;
      return `${lang.name}, `;
    })
    .join('');

// clear old content
const clearAll = function () {
  inputSearch.value = countryHeader.textContent = countryInfo.innerHTML = errorMessage.textContent =
    '';
  countryFlag.setAttribute('src', '');
  errorMessage.classList.add('hidden');
  resultInnerBox.classList.add('hidden');
};

// Show search result
const createSearchResult = function (countryData) {
  resultBox.classList.remove('hidden');

  const {
    name: countryname,
    flag,
    subregion,
    population,
    capital,
    currencies: curr,
    languages: lang,
  } = countryData;

  const pop = () =>
    population > 1000000
      ? (+population / 1000000).toFixed(2) + 'M'
      : population;

  clearAll();
  resultInnerBox.classList.remove('hidden');
  countryFlag.setAttribute('src', flag);
  countryHeader.textContent = countryname;

  const html = `
    <p>${countryname} is situated in ${subregion}.
    It has a population of ${pop()} people.</p>
    <p>The capital is <strong>${capital} </strong>
    and you can pay with ${currencies(curr)}.</p>
    <p>They speak ${languages(lang)}.</p>
  `;

  countryInfo.innerHTML = html;
};

// Show error
showError = function () {
  clearAll();
  resultBox.classList.remove('hidden');
  errorMessage.classList.remove('hidden');

  const errorHtml = 'Sorry, but this is not a country, please try again!';
  errorMessage.insertAdjacentHTML('beforeend', errorHtml);
};

// trigger get country function and use input value
btnSearch.addEventListener('click', () => getCountry(inputSearch.value));

// trigger button click when user releases enter key
inputSearch.addEventListener('keyup', event => {
  if (event.keyCode === 13) {
    event.preventDefault();
    btnSearch.click();
  }
});
