class View {
  _data;
  _parentElement = document.querySelector('.countries');
  _finder = document.querySelector('.finder');
  _search = document.querySelector('.search__input');
  _filter = document.querySelector('.filter__list');

  render(data) {
    data = this._data;
  }

  addHandlerBack(handler) {
    this._parentElement.addEventListener('click', ({ target }) => {
      if (!target.closest('.btn__prev')) return;
      handler();
    });
  }

  addHandlerFilter(handler) {
    this._filter.addEventListener('click', handler);
  }

  addHandlerSearch(handler) {
    this._search.addEventListener('input', (e) => {
      const query = e.target.value;
      handler(query);
    });
  }

  addHandlerDetailPage(handler) {
    this._parentElement.addEventListener('click', ({ target }) => {
      if (!target.closest('.country')) return;
      this._finder.classList.add('hide');
      const country = target
        .closest('.country')
        .querySelector('.country__name');
      handler(country);
    });
  }

  addBorderHandler(handler) {
    this._parentElement.addEventListener('click', ({ target }) => {
      if (!target.closest('.details-country__border-item')) return;
      handler(target);
    });
  }

  getBorderCountries() {
    return Object.values(this._data)[0].filter((country) => {
      if (!this._data.countryDetail.borders) return;
      return this._data.countryDetail.borders.includes(country.shortname);
    });
  }

  _generateCountryMarkup(data) {
    return `<div class="country">
    <img src="${data.flags['svg']}" alt="flag of ${data.name.common}" class="country__flag">
    <div class="country__info">
      <h2 class="country__name">${data.name.common}</h2>
      <ul>
        <li class="country__desc"><span class="country__desc-bold">Population:</span> ${data.population}</li>
        <li class="country__desc"><span class="country__desc-bold">Region:</span> ${data.region}</li>
        <li class="country__desc"><span class="country__desc-bold">Capital:</span> ${data.capital}</li>
      </ul>
    </div>
  </div>
    `;
  }

  _generateDetailCountryMarkup() {
    const {
      name,
      capital,
      borders,
      domain,
      languages,
      population,
      flags,
      currencies,
      region,
      subregion,
    } = this._data.countryDetail;
    return `
    <section class="details-country">
            <button class="btn btn__prev">Back</button>
            <div class="details-country-container">
              <img src="${flags['svg']}" alt="flag of ${
      name.common
    }" class="details-country__flag">
              <div class="details-country__info">
                <h2 class="country__name">${name.common}</h2>
                <div class="details-country__info-container">
                  <ul>
                    <li value="name" class="country__desc"><span class="country__desc-bold">Native Name: </span>${
                      Object.entries(name.nativeName)[0][1]?.official
                    }</li>
                    <li value="population" class="country__desc"><span class="country__desc-bold">Population: </span>${population}</li>
                    <li value="region" class="country__desc"><span class="country__desc-bold">Region: </span>${region}</li>
                    <li value="subregion" class="country__desc"><span class="country__desc-bold">Sub Region: </span>${
                      subregion ? subregion : 'No sub region'
                    }</li>
                    <li value="capital" class="country__desc"><span class="country__desc-bold">Capital: </span>${
                      capital ? capital : 'No capital'
                    }</li>
                  </ul>
                  <ul>
                    <li value="domain" class="country__desc"><span class="country__desc-bold">Top Level Domain: </span>${Object.values(
                      domain
                    )
                      .map((dom) => `${dom} `)
                      .join('')}</li>
                    <li value="currencies" class="country__desc"><span class="country__desc-bold">Currencies: </span>${
                      Object.entries(currencies)[0][1]?.name
                    } (${Object.entries(currencies)[0][1]?.symbol})</li>
                    <li value="languages" class="country__desc"><span class="country__desc-bold">Languages: </span>${Object.values(
                      languages
                    ).map((lang) => ` ${lang}`)}</li>
                  </ul>
                </div>
                <div class="details-country__border">
                  <h3>Border Countries:</h3>
                  <ul>
                  ${
                    borders
                      ? this.getBorderCountries()
                          .map(({ name }) => {
                            return `<li class="details-country__border-item">${name.common}</li>`;
                          })
                          .join('')
                      : 'No borders'
                  }
                  </ul>
                </div>
              </div>
            </div>
            
          </section>
    `;
  }

  renderDetailsCountry(data) {
    this._data = data;
    this._clear();
    const markup = this._generateDetailCountryMarkup();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderSearchCountries(data) {
    this._data = data;
    this._clear();
    this._finder.classList.remove('hide');
    this._data.searchCountries.forEach(
      ({ name, capital, population, flags, region }) => {
        const markup = this._generateCountryMarkup({
          name,
          flags,
          population,
          region,
          capital,
        });
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
    );
  }

  renderCountries(data) {
    this._data = data;
    this._clear();
    this._finder.classList.remove('hide');

    this._data.countries.forEach(
      ({ name, capital, population, flags, region }) => {
        const markup = this._generateCountryMarkup({
          name,
          flags,
          population,
          region,
          capital,
        });
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
    );
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
}

export default new View();
