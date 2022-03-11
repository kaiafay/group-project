var yelpContainer = document.getElementById("results");
var searchHistoryCont = document.getElementById("searches");

var apiUrl = "https://api.yelp.com/v3/businesses/search";

// function to get yelp api data
var getYelp = function() {
    fetch(apiUrl).then(function(response) {
        // check to see if response is successful
        if (response.ok) {
            return response.json().then(function(data) {
                // console log data
                console.log(data);
            });
        } else {
            // if response is unsuccessful, alert user
            alert("Error: " + response.statusText);
        };
    });
};