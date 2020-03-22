//declaring variables
let apiKey = "9c77c2d5b00d3d1f3c69362296775802";
let city = "";
let search = $(".form-control")
let list = $("#list")
let newCityText = search.val()


//function on starting up the site, if there was a last city displayed
function init() {
  //clear main-town card
  $("#main-town").empty()
  //get city from local storage
  let city = localStorage.getItem("city")
  queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
  //setting title of card
  $("#main-town").append($("<h3>").text(city + ", " + moment().format('MMMM D YYYY, h:mm a')))
  //copied code from the updateCard function
   //make request to API for info on searched city
   $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    //Display weather info
    $("#main-town").append($("<p>").text("Temperature: " + Math.floor(response.main.temp) + "\xB0"))
    $("#main-town").append($("<p>").text("Humidity: " + response.main.humidity + "%"))
    $("#main-town").append($("<p>").text("Wind Speed: " + response.wind.speed + " MPH"))
    $("#main-town").append($("<p>").text("UV Index: "))
    //put icon on the h3
    let icon = response.weather[0].icon
    let src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    $("#main-town").find("h3").append($("<img>").attr("src", src))
  })

}

//function to display current info in big card
function updateCard() {
  //declare city variable
  let city = search.val()
  queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + apiKey;
  console.log(city)
  //clear main-town card
  $("#main-town").empty()
  //select main-town card, select it's h3 and update its text
  $("#main-town").append($("<h3>").text(city + ", " + moment().format('MMMM D YYYY, h:mm a')))
  //make request to API for info on searched city
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    //Display weather info
    $("#main-town").append($("<p>").text("Temperature: " + Math.floor(response.main.temp) + "\xB0"))
    $("#main-town").append($("<p>").text("Humidity: " + response.main.humidity + "%"))
    $("#main-town").append($("<p>").text("Wind Speed: " + response.wind.speed + " MPH"))
    $("#main-town").append($("<p>").text("UV Index: "))
    //put icon on the h3
    let icon = response.weather[0].icon
    let src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
    $("#main-town").find("h3").append($("<img>").attr("src", src))
  })
  //put this city in local storage
  localStorage.setItem("city", city)
}

function uvIndex() {
  let city = search.val()
  console.log(city)
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&units=imperial&appid=" + apiKey,
    method: 'GET'
  }).done(function (response) {
    let lat = response.city.coord.lat.toFixed(2)
    let lon = response.city.coord.lon.toFixed(2)
    console.log(lat)

    $.ajax({
      url: "http://api.openweathermap.org/data/2.5/uvi?appid=9c77c2d5b00d3d1f3c69362296775802" + "&lat=" + lat + "lon=" + lon,
      method: 'GET'
    }).done(function (response) {
      console.log(response)

    })
  })
}

//function for the five day forecast
function fiveDay() {
  //clear content from any previous forecasts
  $(".five-day").children(".card").empty()
  let city = search.val()
  queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    console.log(response)
    //hook into each day card
    let day1 = $("#6")
    let day2 = $("#14")
    let day3 = $("#22")
    let day4 = $("#30")
    let day5 = $("#38")


    //create the h6 tags of the dates of the five days
    day1.append($("<h6>").text(moment().add(1, 'days').format('MMMM D YYYY')))
    day2.append($("<h6>").text(moment().add(2, 'days').format('MMMM D YYYY')))
    day3.append($("<h6>").text(moment().add(3, 'days').format('MMMM D YYYY')))
    day4.append($("<h6>").text(moment().add(4, 'days').format('MMMM D YYYY')))
    day5.append($("<h6>").text(moment().add(5, 'days').format('MMMM D YYYY')))

    //loop through the cards to place the icons and the info
    for (i = 6; i < 40; i += 8) {
      //each card selected in loop
      var card = $("#" + i)
      //set up icon
      var icon = response.list[i].weather[0].icon
      console.log(icon)
      let src = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      card.append($("<img>").attr("src", src))
      //now the text info
      card.append($("<p>").text("Temperature: " + Math.floor(response.list[i].main.temp) + "\xB0"))
      card.append($("<p>").text("Humidity: " + response.list[i].main.humidity + "%"))
    }

  })
}


//when the city is searched by pressing enter
search.on("keyup", function () {
  // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    let newCityText = search.val()
    //create list item with the search as text
    let newCity = $("<li>").addClass("list-group-item")
    newCity.text(newCityText)
    //append to list
    list.find("ul").append(newCity)
    //display list
    list.css("display", "")
    //call updateCard and uvIndex function
    updateCard()
    fiveDay()
    // uvIndex()
  }
})

//call initial function
init()