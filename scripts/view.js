class View {
  _data;
  _parentElement = document.querySelector('.countries');
  _filter = document.querySelector('.filter__list');

  render(data) {
    data = this._data;
  }

  addHandlerFilter(handler) {
    this._filter.addEventListener('click', handler);
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }

  generateCountriesMarkup(data) {
    this._data = data;
    this._clear();
    this._data.countries.forEach(
      (
        {
          name,
          capital,
          borders,
          languages,
          population,
          flags,
          currencies,
          region,
          subregion,
        },
        i
      ) => {
        const markup = `<div class="country">
      <img src="${flags['svg']}" alt="flag" class="country__flag">
      <div class="country__info">
        <h2 class="country__name">${name.common}</h2>
        <ul>
          <li class="country__desc"><span class="country__desc-bold">Population:</span> ${population}</li>
          <li class="country__desc"><span class="country__desc-bold">Region:</span> ${region}</li>
          <li class="country__desc"><span class="country__desc-bold">Capital:</span> ${capital}</li>
        </ul>
      </div>
    </div>
      `;
        this._parentElement.insertAdjacentHTML('afterbegin', markup);
      }
    );
  }
}

export default new View();
