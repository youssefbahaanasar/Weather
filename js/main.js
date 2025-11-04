"use strict";
const forecast = document.querySelector("#forecast");
const search = document.querySelector("#search");
search.addEventListener("input", function (e) {
  const location = search.value;
  if (location) {
    getWeather(location);
  }
});
const searchBtn = document.querySelector("#searchBtn");
searchBtn.addEventListener("click", function (e) {
  const location = search.value;
  getWeather(location);
});
async function getWeather(location) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=c71c0e05f42a482cac6181105250311&q=${location}&days=3&aqi=no&alerts=no`
    );
    const data = await response.json();
    const valuesArray = Object.values(data);
    const [v1, v2, v3] = valuesArray;
    const loc = v1;
    const today = v2;
    const fore = Object.values(v3.forecastday);
    displayWeatherData(fore, today, loc);
  } catch (error) {
    console.log(error);
  }
}
function displayWeatherData(fore, today, loc) {
  const wind_direction = {
    N: { text: "North", image: "North" },
    E: { text: "East", image: "East" },
    W: { text: "West", image: "West" },
    S: { text: "South", image: "South" },
    NE: { text: "Northeast", image: "NE" },
    NW: { text: "Northwest", image: "NW" },
    NNE: { text: "North-Northeast", image: "NE" },
    ENE: { text: "East-Northeast", image: "NE" },
    WNW: { text: "West-Northwest", image: "NW" },
    NNW: { text: "North-Northwest", image: "NW" },
    SE: { text: "Southeast", image: "SE" },
    SW: { text: "Southwest", image: "SW" },
    ESE: { text: "East-Southeast", image: "SE" },
    SSE: { text: "South-Southeast", image: "SE" },
    WSW: { text: "West-Southwest", image: "SW" },
    SSW: { text: "South-Southwest", image: "SW" },
  };

  let days = [];
  for (let i = 0; i < fore.length; i++) {
    let todayDate = new Date(fore[i].date);
    let date = {
      day_Month: todayDate.toLocaleDateString("en-GB", {
        month: "long",
        day: "numeric",
      }),
      dayName: todayDate.toLocaleDateString("en-GB", { weekday: "long" }),
    };
    days.push(date);
  }

  const container = `
                <div class="card text-bg-dark col-lg-4">
                    <div class="card-header d-flex justify-content-between">
                        <h2 class="h6 m-0">${days[0].dayName}</h2>
                        <h2 class="h6 m-0">${days[0].day_Month}</h2>
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">${loc.name}</h5>
                        <span>${today.temp_c}<sup>o</sup>C</span>
                        <img class="currentDay" src="${
                          today.condition.icon
                        }" alt="">
                        <p class="card-text">${today.condition.text}</p>
                    </div>
                    <div class="card-footer">
                        <span class="rain">
                            <img src="./images/imgi_3_icon-umberella@2x.png" alt="">
                            ${fore[0].day.daily_chance_of_rain}%
                        </span>
                        <span class="wind">
                            <img src="./images/imgi_4_icon-wind@2x.png" alt="">
                            ${today.wind_kph}km/h
                        </span>
                        <span class="direction">
                            <img src="./images/${
                              wind_direction[today.wind_dir].image
                            }.png" alt="">
                            ${wind_direction[today.wind_dir].text}
                        </span>
                    </div>
                </div>
                <div class="card text-bg-dark col-lg-4">
                    <div class="card-header text-center">
                        <h2 class="h6 m-0">${days[1].dayName}</h2>
                    </div>
                    <div class="card-body text-center mt-4">
                        <img class="tomorrow" src="${
                          fore[1].day.condition.icon
                        }" style="width: 48px;" alt="">
                        <p class="text-white fs-4 fw-bold">${
                          fore[1].day.maxtemp_c
                        }<sup>o</sup>C</p>
                        <p>${fore[1].day.mintemp_c}<sup>o</sup>C</p>
                        <p class="card-text">${fore[1].day.condition.text}</p>
                    </div>
                </div>
                <div class="card text-bg-dark col-lg-4">
                    <div class="card-header text-center">
                        <h2 class="h6 m-0">${days[2].dayName}</h2>
                    </div>
                    <div class="card-body text-center mt-4">
                        <img class="dayAfter" src="${
                          fore[2].day.condition.icon
                        }" style="width: 48px;" alt="">
                        <p class="text-white fs-4 fw-bold">${
                          fore[2].day.maxtemp_c
                        }<sup>o</sup>C</p>
                        <p>${fore[2].day.mintemp_c}<sup>o</sup>C</p>
                        <p class="card-text">${fore[2].day.condition.text}</p>
                    </div>
                </div>
    `;
  forecast.innerHTML = container;
}
getWeather("cairo");
