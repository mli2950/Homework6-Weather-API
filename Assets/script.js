var m = moment().format("LLL");
const APIKey = "1a782e7aafcfa4684a2e6ac3c8810cba";
var storedCities = [];

$("button").click(function () {
    $("p").empty();
    $("h3").empty();

  var userInput = document.getElementById("cityInput").value;
  var requestURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    userInput + "&units=imperial&APPID=" + APIKey;

  $.ajax({
    url: requestURL,
      method: "GET",
      success: function (cityJSON) {
          console.log(cityJSON);
          var historyItem = JSON.parse(localStorage.getItem(localStorage.key("userInput")))
          $("#cityNameDisplay").append(cityJSON.name + " - " +  m)
          $("#temperatureDisplay").append("Temperature: " + cityJSON.main.temp + " Degrees")
          $("#humidityDisplay").append("Humidity: " + cityJSON.main.humidity + "%")
          $("#windSpeedDisplay").append("Wind Speed: " + cityJSON.wind.speed + " Miles Per Hour")
          $("#skiesDisplay").append("Skies are: " + cityJSON.weather[0].main)
          var userInput = $("#cityInput").val()
          storedCities.push(userInput)
          localStorage.setItem("userInput", JSON.stringify(storedCities))
          
          
              var searchItem = document.createElement("input");
              searchItem.setAttribute("type", "text");
              searchItem.setAttribute("readonly", "true");
              searchItem.setAttribute("class", "form-contronl d-block");
              searchItem.setAttribute("value", userInput)
              searchItem.setAttribute("click", function () {
                //   TODO: Implement returning weather when clicking history
              })
              $("#history").append(searchItem);
          
        
      }
  });
});

function showStorage() {
    var historyItem = JSON.parse(localStorage.getItem(localStorage.key("userInput")));
    if (historyItem !== null) {
        for (i = 0; i < historyItem.length; i++) {
            var searchItem = document.createElement("input");
              searchItem.setAttribute("type", "text");
              searchItem.setAttribute("readonly", "true");
              searchItem.setAttribute("class", "form-contronl d-block");
              searchItem.setAttribute("value", historyItem[i])
              searchItem.setAttribute("click", function () {
                //   TODO: Implement returning weather when clicking history
              })
              $("#history").append(searchItem);
        }
    }
}

showStorage();


