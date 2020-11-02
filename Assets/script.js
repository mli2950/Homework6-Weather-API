var m = moment().format("LLL");
const APIKey = "1a782e7aafcfa4684a2e6ac3c8810cba";
var storedCities = [];

$("button").click(function () {
    $("p").empty();
    $("h3").empty();
    if (localStorage.getItem("userInput") !== null) {
        storedCities = JSON.parse(localStorage.getItem("userInput"));
      }

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
            $("#cityNameDisplay").append(cityJSON.name + " - " + m)
            $("#temperatureDisplay").append("Temperature: " + cityJSON.main.temp + " Degrees")
            $("#humidityDisplay").append("Humidity: " + cityJSON.main.humidity + "%")
            $("#windSpeedDisplay").append("Wind Speed: " + cityJSON.wind.speed + " Miles Per Hour")
            var userInput = $("#cityInput").val()
            storedCities.push(userInput)
            localStorage.setItem("userInput", JSON.stringify(storedCities))
          
            if (historyItem !== null) {
                var searchItem = document.createElement("input");
                searchItem.setAttribute("type", "text");
                searchItem.setAttribute("readonly", "true");
                searchItem.setAttribute("class", "form-control d-block searchItem");
                searchItem.setAttribute("id", "searchItem")
                searchItem.setAttribute("value", storedCities[storedCities.length-1])
                
            
                $("#history").append(searchItem);
                getUV(cityJSON.coord.lat, cityJSON.coord.lon)
                fiveDay(document.getElementById("cityInput").value)
            }
        
        }
    }
    )
})



function showStorage() {
    var historyItem = JSON.parse(localStorage.getItem(localStorage.key("userInput")));
    if (historyItem !== null) {
        for (i = 0; i < historyItem.length; i++) {
            var searchItem = document.createElement("input");
              searchItem.setAttribute("type", "text");
              searchItem.setAttribute("readonly", "true");
              searchItem.setAttribute("class", "form-control d-block searchItem");
              searchItem.setAttribute("id", "searchItem");
              searchItem.setAttribute("value", historyItem[i])
              $("#history").append(searchItem);
        }
    }
}

showStorage();

$(".searchItem").click(function () {
    $("p").empty();
    $("h3").empty();
    var historyInput = this.value
    
    console.log(historyInput)
        $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" +
        historyInput + "&units=imperial&APPID=" + APIKey,
        method: "GET",
        success: function (cityJSON) {
            console.log(cityJSON);
            
            $("#cityNameDisplay").append(cityJSON.name + " - " + m)
            $("#temperatureDisplay").append("Temperature: " + cityJSON.main.temp + " Degrees")
            $("#humidityDisplay").append("Humidity: " + cityJSON.main.humidity + "%")
            $("#windSpeedDisplay").append("Wind Speed: " + cityJSON.wind.speed + " Miles Per Hour")
            
            getUV(cityJSON.coord.lat, cityJSON.coord.lon)
        }
    })
})

function getUV(lat, lon) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey,
        method: "GET",
        success: function (uvJSON) {
            // console.log("success", uvJSON)
            $("#cityUV").append("UV Index: " + uvJSON.value);
        }
    })
}

function fiveDay(x) {
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast?q=" + x + "&appid=" + APIKey,
        method: "GET",
        success: function (fiveForecast) {
            console.log("five success", fiveForecast)
            console.log(fiveForecast.main.list.main)
        }
    })

}