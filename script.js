let apiKey = "9c77c2d5b00d3d1f3c69362296775802";
let city = "New York";


queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&cnt=5&units=imperial&appid=" + apiKey;

//declaring variables
let search = $(".form-control")
let list = $("#list")
let newCityText = search.val()

//display current info in big card
function updateCard(){
    //declare city variable
    let city = search.val()
    console.log(city)
    //clear main-town card
    $("#main-town").empty()
    //select main-town card, select it's h3 and update its text
    $("#main-town").append($("<h3>").text(city + ", " + moment().format('MMMM Do YYYY, h:mm a')))
    //make request to API for info on searched city
    $.ajax({
        url: queryURL,
        method: 'GET'
      }).done(function(response) {
        console.log(response)
        //Display weather info
        $("#main-town").append($("<p>").text("Temperature: " + Math.floor(response.list[0].main.temp) + "\xB0"))
        $("#main-town").append($("<p>").text("Humidity: "))
        $("#main-town").append($("<p>").text("Wind Speed: "))
        $("#main-town").append($("<p>").text("UV Index: "))
      })
}

//when the city is searched by pressing enter
search.on("keyup", function(){
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
    //call updateCard function
    updateCard()
}})

//display current info in big card
//display five day forecast
//save list of cities to local storage