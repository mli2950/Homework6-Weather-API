// Hide the 5 Day forecast cards until called
$(".forecast").hide();
// Moment.JS call and formatting
var m = moment().format("LLL");
// API key to be concatenated into API call URL's
const APIKey = "1a782e7aafcfa4684a2e6ac3c8810cba";
// Empty array to store values from local storage
var storedCities = [];

// Event listener for pressing enter button while typing in input field
var enter = document.getElementById("cityInput");
enter.addEventListener("keyup", function () {
  if (event.keyCode == 13) {
    // Empty all weather information elements
    $("p").empty();
      $("h3").empty();
    $("span").empty();
    // If there is anything in local Storage, place those values inside the empty array
    if (localStorage.getItem("userInput") !== null) {
      storedCities = JSON.parse(localStorage.getItem("userInput"));
    }
    // Assign the users input from the input element to the userInput variable
    var userInput = document.getElementById("cityInput").value;
    // store the API call url in a variable, concatenated with variables to complete the link
    var requestURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      userInput +
      "&units=imperial&APPID=" +
      APIKey;
    // Ajax call to get data from the API
    $.ajax({
      url: requestURL,
      method: "GET",
      // If the call is successful, run this function
      success: function (cityJSON) {
        console.log(cityJSON);
        // Grab the icon code from the data return, and assign it to a variable
        var getfivedayIcon = cityJSON.weather[0].icon;
        fivedayIcon =
          "http://openweathermap.org/img/wn/" + getfivedayIcon + "@2x.png";

        // Grab the array from local Storage, and assign it to the historyItem variable
        var historyItem = JSON.parse(
          localStorage.getItem(localStorage.key("userInput"))
        );
        // Appending current weather data to the page by grabbing it from the data return
        $("#cityNameDisplay").append(
          cityJSON.name + " - " + m + "<img src=" + fivedayIcon + ">"
        );
        $("#temperatureDisplay").append(
          "Temperature: " + cityJSON.main.temp + " &deg;F"
        );
        $("#humidityDisplay").append(
          "Humidity: " + cityJSON.main.humidity + "%"
        );
        $("#windSpeedDisplay").append(
          "Wind Speed: " + cityJSON.wind.speed + " Miles Per Hour"
        );

        // Grab the value from the input Element, and assign it a variable. Push that value into the array, and store that array in local storage.
        var userInput = $("#cityInput").val();
        storedCities.push(userInput);
        localStorage.setItem("userInput", JSON.stringify(storedCities));

        // if there is any values in historyItem, append the weather information for that value.
        if (historyItem !== null) {
          var searchItem = document.createElement("input");
          searchItem.setAttribute("type", "text");
          searchItem.setAttribute("readonly", "true");
          searchItem.setAttribute("class", "form-control d-block searchItem");
          searchItem.setAttribute("id", "searchItem");
          searchItem.setAttribute(
            "value",
            storedCities[storedCities.length - 1]
            );
            searchItem.addEventListener("click", function (event) {
                var historySearch = this.value
            console.log(historySearch)
            showHistory(historySearch)
            })
  

          $("#history").append(searchItem);
          getUV(cityJSON.coord.lat, cityJSON.coord.lon);
          fiveDay(cityJSON.coord.lat, cityJSON.coord.lon);
        }
      },
    });
  }
});

// When the search button is clicked, run the getweather function
$("button").click(getWeather())

// showHistory function
function showHistory(x) {
  // Empty appended weather data
    $("p").empty();
    $("h3").empty();
    $("span").empty();
  if (localStorage.getItem("userInput") !== null) {
    storedCities = JSON.parse(localStorage.getItem("userInput"));
  }
  // Userinput is set to the lat and lon values that are passed to the function
  var userInput = x;
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&units=imperial&APPID=" +
    APIKey;

  $.ajax({
    url: requestURL,
    method: "GET",
    success: function (cityJSON) {
      console.log(cityJSON);

      var getfivedayIcon = cityJSON.weather[0].icon;
      fivedayIcon =
        "http://openweathermap.org/img/wn/" + getfivedayIcon + "@2x.png";

      var historyItem = JSON.parse(
        localStorage.getItem(localStorage.key("userInput"))
      );
      $("#cityNameDisplay").append(
        cityJSON.name + " - " + m + "<img src=" + fivedayIcon + ">"
      );
      $("#temperatureDisplay").append(
        "Temperature: " + cityJSON.main.temp + " &deg;F"
      );
      $("#humidityDisplay").append("Humidity: " + cityJSON.main.humidity + "%");
      $("#windSpeedDisplay").append(
        "Wind Speed: " + cityJSON.wind.speed + " Miles Per Hour"
      );
      var userInput = $("#cityInput").val();
      storedCities.push(userInput);
      localStorage.setItem("userInput", JSON.stringify(storedCities));

        $("#history").append(searchItem);
        getUV(cityJSON.coord.lat, cityJSON.coord.lon);
          fiveDay(cityJSON.coord.lat, cityJSON.coord.lon);
    },
  });

}

// getWeather function
function getWeather(x) {

  $("p").empty();
    $("h3").empty();
    $("span").empty();
  if (localStorage.getItem("userInput") !== null) {
    storedCities = JSON.parse(localStorage.getItem("userInput"));
  }

  var userInput = document.getElementById("cityInput").value;
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput +
    "&units=imperial&APPID=" +
    APIKey;

  $.ajax({
    url: requestURL,
    method: "GET",
    success: function (cityJSON) {
      console.log(cityJSON);

      var getfivedayIcon = cityJSON.weather[0].icon;
      fivedayIcon =
        "http://openweathermap.org/img/wn/" + getfivedayIcon + "@2x.png";

      var historyItem = JSON.parse(
        localStorage.getItem(localStorage.key("userInput"))
      );
      $("#cityNameDisplay").append(
        cityJSON.name + " - " + m + "<img src=" + fivedayIcon + ">"
      );
      $("#temperatureDisplay").append(
        "Temperature: " + cityJSON.main.temp + " &deg;F"
      );
      $("#humidityDisplay").append("Humidity: " + cityJSON.main.humidity + "%");
      $("#windSpeedDisplay").append(
        "Wind Speed: " + cityJSON.wind.speed + " Miles Per Hour"
      );
      var userInput = $("#cityInput").val();
      storedCities.push(userInput);
      localStorage.setItem("userInput", JSON.stringify(storedCities));

      if (historyItem !== null) {
        var searchItem = document.createElement("input");
        searchItem.setAttribute("type", "text");
        searchItem.setAttribute("readonly", "true");
        searchItem.setAttribute("class", "form-control d-block searchItem");
        searchItem.setAttribute("id", "searchItem");
          searchItem.setAttribute("value", storedCities[storedCities.length - 1]);
          searchItem.addEventListener("click", function (event) {
            var historySearch = this.value
            console.log(historySearch)
            showHistory(historySearch)
          })

        $("#history").append(searchItem);
        getUV(cityJSON.coord.lat, cityJSON.coord.lon);
          fiveDay(cityJSON.coord.lat, cityJSON.coord.lon);

      }
    },
  });
};

// showStorage function that is called when page is loaded
function showStorage() {
  var historyItem = JSON.parse(
    localStorage.getItem(localStorage.key("userInput"))
    );
    console.log("Test: " + historyItem)
   
  if (historyItem !== null) {
    for (i = 0; i < historyItem.length; i++) {
      var searchItem = document.createElement("input");
      searchItem.setAttribute("type", "text");
      searchItem.setAttribute("readonly", "true");
      searchItem.setAttribute("class", "form-control d-block searchItem");
      searchItem.setAttribute("id", "searchItem");
        searchItem.setAttribute("value", historyItem[i]);
        searchItem.addEventListener("click", function (event) {
            
            var historySearch = this.value
            console.log(historySearch)
            showHistory(historySearch)
            
        })
        

      $("#history").append(searchItem);
    }
  }
}
// showStorage function call
showStorage();

// Function to get the UV index when called
function getUV(lat, lon) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/uvi?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      APIKey,
    method: "GET",
      success: function (uvJSON) {
          console.log(uvJSON)
          $("#cityUV").append("UV Index: ")
          $("#uvNum").append(" " + uvJSON.value);
          if (uvJSON.value >= 0 && uvJSON.value <= 2) {
              $("#uvNum").attr("style", "background-color:green; color: white")
          } else if (uvJSON.value >= 2 && uvJSON.value <= 5) {
              $("#uvNum").attr("style", "background-color:orange")
          } else {
              $("#uvNum").attr("style", "background-color:red; color: white")
          }
    },
  });
}

// Function to display 5 day forecast when called
function fiveDay(lat, lon) {
  // Show the forecast cards
  $(".forecast").show();
  // Empty the forecast cards so info is not appended over other info
  $("#forecast1").empty();
  $("#forecast2").empty();
  $("#forecast3").empty();
  $("#forecast4").empty();
  $("#forecast5").empty();
  // AJAX call
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&exclude=minutely,current,hourly,alerts&units=imperial&appid=" +
      APIKey,
    method: "GET",
    success: function (fiveForecast) {
      for (var i = 0; i < 6; i++) {
        var getfivedayIcon = fiveForecast.daily[i].weather[0].icon;
        fivedayIcon =
          "https://openweathermap.org/img/wn/" + getfivedayIcon + "@2x.png";
        var time = fiveForecast.daily[i].dt;
        var newTime = moment.unix(time).format("MM/DD/YYYY");

        $("#forecast" + [i]).append(newTime);
        $("#forecast" + [i]).append("<img src=" + fivedayIcon + ">");
        $("#forecast" + [i]).append(
          "\nTemp: " + fiveForecast.daily[i].temp.day + " &deg;F"
        );
        $("#forecast" + [i]).append(
          "\nHumidity: " + fiveForecast.daily[i].humidity + "%"
        );
      }
    },
  });
}
