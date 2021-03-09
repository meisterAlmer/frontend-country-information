// Select elements
const countryList = document.querySelector('#country-list');
const errorMessage = document.querySelector('.error-message');

// API call
const loadAllCountries = async function () {
  try {
    showSpinner();

    // Get country data
    const response = await axios.get(`https://restcountries.eu/rest/v2/all`);

    // Sort country data by population
    const countriesSorted = [...response.data].sort((a, b) =>
      a.population > b.population ? 1 : -1
    );

    // Render all countries to html
    renderCountries(countriesSorted);

    // Show population on click with single eventlistener
    countryList.addEventListener('click', showPopulation);
  } catch (error) {
    showError();
  }
  spinner.setAttribute('class', 'hideSpinner');
};

const showSpinner = function () {
  countryList.classList.add('hidden');
  spinner.removeAttribute('class');
};

const renderCountries = function (country) {
  country.forEach(country => {
    const { name: countryname, flag, region, population } = country;

    const pop = () =>
      population > 1000000
        ? (+population / 1000000).toFixed(2) + 'M'
        : population;

    const html = `
    <li class="ctry-item ${region.toLowerCase()} pop-hide">
      <div><img src="${flag}" alt="${countryname}" /></div>
      <div>
        <p>${countryname}</p>
        <p class="pop">
          Population: ${pop()}
        </p>
      </div>
    </li>
    `;

    countryList.insertAdjacentHTML('beforeend', html);
  });
  countryList.classList.remove('hidden');
};

const showPopulation = function (e) {
  document
    .querySelectorAll('.ctry-item')
    .forEach(el => el.classList.add('pop-hide'));

  if (e.target.closest('.ctry-item'))
    e.target.closest('.ctry-item').classList.remove('pop-hide');
};

const showError = function () {
  const errorHtml = 'Sorry, loading the countries has failed!';
  errorMessage.classList.remove('hidden');
  errorMessage.insertAdjacentHTML('beforeend', errorHtml);
};

loadAllCountries();
