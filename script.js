let apiKey = "9c77c2d5b00d3d1f3c69362296775802";
let city = "New York";

queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&cnt=5&units=imperial&appid=" + apiKey;


$.ajax({
    url: queryURL,
    method: 'GET'
  }).done(function(response) {
    console.log(response)
    $("#main-town").append(response.main.temp)
  })

//declaring variables
let search = $(".form-control")
let list = $("#list")

//when the city is searched by pressing enter
search.on("keyup", function(){
      // Number 13 is the "Enter" key on the keyboard
  if (event.keyCode === 13) {
    // Cancel the default action, if needed
    event.preventDefault();
    console.log(search.val())
    //display list
    list.style("display", "")
})
//add it to list of cities
//display current info in big card
//display five day forecast
//save list of cities to local storage