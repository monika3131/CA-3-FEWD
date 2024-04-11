const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn');

const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Searching...please wait 🙂</h2>";
    try {
        
    // used asyn-await for handling the assync function, try-catch for getting result or error
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    // link fetched for searches
    const response = await data.json();

    recipeContainer.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
        button.addEventListener('click', () => {
        openRecipePopup(meal);
        });
        //did styling for each, 
        // added button by creating element for view recipe pop-up
        // add event listener for the event of button click
 
        recipeContainer.appendChild(recipeDiv);
        
    });
    
} catch (error) {
    recipeContainer.innerHTML = "<h2>Error: No such food item found ☹️</h2>";
        
}
//catch error and print the above message if the food is not found 
    
    // console.log(response);
}

const fetchIngredients = (meal) => {
    let ingredientsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`

        }
        else{
            break;
        }
    // fetched ingredients, those were = 20 (as per the data consoled) 
    // so used loop for the number of ingredients and measure of those
    }
    return ingredientsList;

}
const openRecipePopup = (meal) => {
    recipeDetailsContent.innerHTML = `
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions"> 
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>

    </div>
    `
    
    recipeDetailsContent.parentElement.style.display = "block";
}
// it is when the pop up is opened
recipeCloseBtn.addEventListener('click', ()=>{
    recipeDetailsContent.parentElement.style.display = "none";

});

searchBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const searchInput = searchBox.value.trim();
    fetchRecipes(searchInput);
    // console.log("Button Clicked");

    //  searches apper only when searched
});

if (userInput.trim() !== "") {
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php?s=${userInput})`)
    .then((response) =>response.json())
    .then((data)=>{
        if (data.meals){
            const randomMeal = data.meals[Math.floor(Math.random()* data.meals.length)];
        }

    });
}
Reload.addEventListener('click', (e)=>{    
    // console.log("Button Clicked");
});



