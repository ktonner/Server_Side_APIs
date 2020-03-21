//declaring variables
let apiKey = "9c77c2d5b00d3d1f3c69362296775802";
let city = "";
let search = $(".form-control")
let list = $("#list")
let newCityText = search.val()

//display current info in big card
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
    console.log(response)
    //Display weather info
    $("#main-town").append($("<p>").text("Temperature: " + Math.floor(response.main.temp) + "\xB0"))
    $("#main-town").append($("<p>").text("Humidity: " + response.main.humidity + "%"))
    $("#main-town").append($("<p>").text("Wind Speed: " + response.wind.speed))
    $("#main-town").append($("<p>").text("UV Index: "))
    //put icon on the h3
    let icon = response.weather[0].icon
    let src = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
    $("#main-town").find("h3").append($("<img>").attr("src", src))
  })
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
function fiveDay(){
  let city = search.val()
  queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=" + apiKey;
  //hook into each day card
  let day1 = $("#5")
  let day2 = $("#13")
  let day3 = $("#21")
  let day4 = $("#29")
  let day5 = $("#37")

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function (response) {
    //update the h5 tags
    day1.find("h6").text(moment().add(1, 'days').format('MMMM D YYYY'))
    day2.find("h6").text(moment().add(2, 'days').format('MMMM D YYYY'))
    day3.find("h6").text(moment().add(3, 'days').format('MMMM D YYYY'))
    day4.find("h6").text(moment().add(4, 'days').format('MMMM D YYYY'))
    day5.find("h6").text(moment().add(5, 'days').format('MMMM D YYYY'))

    //loop through the cards to place the icons
    for(i=5; i<40; i+=8){
    var card = $("#" + i)
    var icon = response.list[i].weather[0].icon
    console.log(icon)
    let src = "http://openweathermap.org/img/wn/"+ icon + "@2x.png"
    card.append($("<img>").attr("src", src))
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

//display current info in big card
//display five day forecast
//save list of cities to local storage