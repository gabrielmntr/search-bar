const endpoint =
  "https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json";
const cities = [];
const search = document.querySelector(".search");
const suggestions = document.querySelector(".suggestions");

fetch(endpoint)
  .then((blob) => blob.json())
  .then((data) => cities.push(...data));

function matchPlace(word, cities) {
  return cities.filter((place) => {
    const reg = new RegExp(word, "gi"); //global and CaseInsensitive
    return place.city.match(reg) || place.state.match(reg);
  });
}

function insertComma(x) {
  //format population number
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function displayPlace() {
  const result = matchPlace(this.value, cities); //this == the event

  //Highlight:
  // const regex = new RegExp(this.value, 'gi');
  // const cityName = place.city.replace(regex, `<span class="hl">${this.value}</span>`);
  // const stateName = place.state.replace(regex, `<span class="hl">${this.value}</span>`);

  const html = result
    .map(
      (place) =>
        `<li>
                <span>${place.city}, ${place.state}</span>
                <span class="population">${insertComma(place.population)}</span>
              </li>`
    )
    .join("");

  suggestions.innerHTML = html;
}
search.addEventListener("keyup", displayPlace);
search.addEventListener("change", displayPlace);
