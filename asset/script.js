moment(Date);
//set current date using Moment JS and format to show
$("#time-display").text(moment().format('dddd MMMM Do YYYY, h:mm a'));

//Define variables 
var formEl = $('#city-form');
var searchInputEl = $('#search-input');
var cityListEl = $('#city-list');

//Print searched city into a list. 
var printCity = function (city) {
    var listEl = $('<li>');
    var listCity = city;
    listEl.addClass('city-group-item').text(listCity);
    listEl.appendTo(cityListEl);
    document.getElementById('result-text').innerHTML = city;

};

//function to handle search input city 
var handleFormSearch = function (event) {
    event.preventDefault();
    var cityInput = searchInputEl.val();
    var searchInputVal = document.querySelector('#city-form').value;
    console.log(cityInput);
    if (!searchInputEl) {
        console.log('need to input city!');
        return;
    };
    //call on function to run 
    pullWeather(cityInput);
    printCity(cityInput);
    localStorage.setItem('cities', cityInput);

    searchInputEl.val('');
};

//Function to call weather API 
function pullWeather (cityInput) {

    // 5 day forecasting 
    var FiveDayWeather = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + "&Appid=" + weather.key + "&units=imperial";

    fetch(FiveDayWeather)
    .then(function (response) { 
      if (response.ok) {
        response.json().then(function (DataResponse) {
         var day = [0, 8, 16, 24, 32];
         // display 5 Day forcast 
         var fiveDayDisplay = $(".five-Day");
         fiveDayDisplay.empty();
         day.forEach(function (i) {
           var FiveDayTimeUTC1 = new Date(DataResponse.list[i].dt * 1000);
           FiveDayTimeUTC1 = FiveDayTimeUTC1.toLocaleDateString("en-US");
           fiveDayDisplay.append("<div class= fiveDayColor>" + "<p>" + FiveDayTimeUTC1 + "</p>" + `<img src="https://openweathermap.org/img/wn/${DataResponse.list[i].weather[0].icon}@2x.png">`
           + "<p>" + "Temperature: " + DataResponse.list[i].main.temp + "</p>" + "<p>" + "Humidity: " + DataResponse.list[i].main.humidity + "%" + "</p>"
           + "<p>" + "Wind Speed: " + DataResponse.list[i].wind.speed + "</p>" + "</div>");
          });
    })
    } else {
      alert('Error: ' + DataResponse.statusText);
    }
    })
    .catch(function (e) {
    console.log(e);
    });
    }

formEl.on('submit', handleFormSearch);