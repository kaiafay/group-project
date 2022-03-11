// grab html elements from the DOM
var yelpContainer = document.getElementById("results");
var searchHistoryCont = document.getElementById("searches");
var searchBtn = document.getElementById("submit-search");
var businessInput = document.getElementById("business");

var apiUrl = "https://api.yelp.com/v3/businesses/search";

// function to get yelp api data for businesses
var getBusinesses = function() {
    // set business variable to business input value
    var business = $("#business").val();
    // set variable for business api url
    var businessUrl = apiUrl + "?term=" + business;

    fetch(businessUrl).then(function(response) {
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

// add event listener to the search button
searchBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // call the function to get business data
    getBusinesses();
    businessInput.value = '';
});