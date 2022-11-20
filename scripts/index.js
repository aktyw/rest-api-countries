async function getCountryData() {
  try {
    const url = 'https://restcountries.com/v3.1/all';
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

getCountryData();
