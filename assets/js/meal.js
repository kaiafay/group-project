// grab html elements from the DOM
var mealContainer = document.getElementById("results");
var searchHistoryCont = document.getElementById("searches");
var searchBtn = document.getElementById("submit-search");
var mealInput = document.getElementById("meal");

var apiUrl = "https://www.themealdb.com/api/json/v1/1/search.php?s=";

// function to get meal api data for recipes
var getMeals = function() {
    // set meal variable to meal input value
    var meal = $("#meal").val();
    // set variable for meal api url
    var mealUrl = apiUrl + meal;

    fetch(mealUrl).then(function(response) {
        // check to see if response is successful
        if (response.ok) {
            return response.json().then(function(data) {
                // console log data
                console.log(data);
                displayMeals(data);
            });
        } else {
            // if response is unsuccessful, alert user
            alert("Error: " + response.statusText);
        };
    });
};

// function that displays meals
var displayMeals = function(data) {
    // loop through meals and display them on the page
    for(var i=0; i < data.meals.length; i++) {
        var mealLink = document.createElement("p");
        mealLink.textContent = data.meals[i].strMeal
        mealLink.setAttribute("class", "meal-card")
        mealContainer.append(mealLink);
        var ingredientList = document.createElement("ul");
        mealLink.append(ingredientList);
        ingredientList.setAttribute("style", "display: none");
        ingredientList.setAttribute("class", "ingredient-list");

        // loop through ingredient list and display them on the page
        for(var j=1; j < 21; j++) {
            if(data.meals[i][`strIngredient${j}`] !== '' && data.meals[i][`strIngredient${j}`] !== null) {
                var ingredientItem = document.createElement("li");
                ingredientItem.textContent = data.meals[i][`strIngredient${j}`];
                ingredientList.append(ingredientItem);
            };
        };

    // create p element for instructions
    var instructions = document.createElement("p");
    instructions.textContent = data.meals[i].strInstructions;
    instructions.setAttribute("style", "display: none");
    // append instructions to the mealLink
    mealLink.append(instructions);
    };
};
// add event listener to the search button
searchBtn.addEventListener("click", function(event) {
    event.preventDefault();

    // clear previous data
    mealContainer.innerHTML = '';
    // call the function to get the meal data
    getMeals();
    mealInput.value = '';
});

// event listener that shows ingredients and instructions upon clicking on a meal
document.addEventListener("click", function(e) {
    if(e.target.matches(".meal-card")) {
        e.target.children[0].setAttribute("style", "display: block");
        e.target.children[1].setAttribute("style", "display: block");
    };
});