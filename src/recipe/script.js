async function loadRecipes() {
    try {
        const response = await fetch("../data.json");
        const recipes = await response.json();
        return recipes;
    } catch (error) {
        console.error(error);
    }
}

let recipe;
let portions = 1;

window.onload = () => {
    // get query from url
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const increaseButton = document.getElementById("serve-increase-button");
    const decreaseButton = document.getElementById("serve-decrease-button");

    increaseButton.addEventListener("click", () => onIncreaseButtonClicked());
    decreaseButton.addEventListener("click", () => onDecreaseButtonClicked());

    loadRecipes().then(
        (recipes) => {
            recipe = recipes.find((r) => r.id == id);
            document.title = "Culinary Quest - " + recipe.name;
            displaySimilarRecipes(recipes);
            updateImage();
            updateTitle();
            updateDifficulty();
            updateRating();
            updateTags();
            updateIngredientsNew(portions);
            updateNutritions();
            updatePreperations();
        },
        (reject) => {}
    );
};

function updateTitle() {
    const span = document.getElementById("recipe-title");
    span.innerText = recipe.name;
}

function updateImage() {
    const img = document.getElementById("recipe-image");
    img.src = `../recipes/${recipe.image}`;
}

function updateDifficulty() {
    const span = document.getElementById("recipe-difficulty");
    span.innerText = "Difficulty: " + recipe.difficulty;
}

function updateRating() {
    const span = document.getElementById("recipe-rating");
    span.innerText = "Rating: " + recipe.rating;
}

function updateTags() {
    const div = document.getElementById("recipe-tags");
    recipe.tags.forEach((tag) => {
        const button = document.createElement("button");
        button.classList.add("p-2", "shadow-lg", "rounded-md", "bg-white");
        button.textContent = tag;
        div.appendChild(button);
    });
}

function updateIngredientsNew(portions) {
    const span = document.getElementById("recipe-portions");
    span.textContent = portions;

    validateServingButtons();

    // update and recalculate ingredients
    const div = document.getElementById("recipe-ingredients");

    // clear previous ingredients
    div.innerHTML = "";
    recipe.ingredients.forEach((ingredient) => {
        const ingredientElement = document.createElement("div");
        ingredientElement.classList.add("flex", "flex-row", "gap-1", "pl-2");
        ingredientElement.textContent = `${ingredient.quantity * portions} ${
      ingredient.unit
    } ${ingredient.name}`;
        div.appendChild(ingredientElement);
    });
}

function onDecreaseButtonClicked() {
    portions = portions - 1;
    updateIngredientsNew(portions);
}

function onIncreaseButtonClicked() {
    portions = portions + 1;
    updateIngredientsNew(portions);
}

function updateNutritions() {
    const caloriesSpan = document.getElementById("recipe-calories");
    caloriesSpan.textContent = recipe.nutrients.find(
        (n) => n.name === "Calories"
    ).amount;

    const fatSpan = document.getElementById("recipe-fat");
    fatSpan.textContent = recipe.nutrients.find((n) => n.name === "Fat").amount;

    const proteinSpan = document.getElementById("recipe-protein");
    proteinSpan.textContent = recipe.nutrients.find(
        (n) => n.name === "Protein"
    ).amount;

    const carbsSpan = document.getElementById("recipe-carb");
    carbsSpan.textContent = recipe.nutrients.find(
        (n) => n.name === "Carbohydrates"
    ).amount;
}

function updatePreperations() {
    const div = document.getElementById("recipe-preparations");
    recipe.preparation.split("\n").forEach((step) => {
        const paragraph = document.createElement("p");
        paragraph.textContent = step;
        div.appendChild(paragraph);
    });
}

function validateServingButtons() {
    const span = document.getElementById("recipe-portions");
    if (span.textContent == "1") {
        const leftButton = document.getElementById("serve-decrease-button");
        const rightButton = document.getElementById("serve-increase-button");
        leftButton.disabled = true;
        rightButton.disabled = false;
    } else if (span.textContent == "10") {
        const leftButton = document.getElementById("serve-decrease-button");
        const rightButton = document.getElementById("serve-increase-button");
        leftButton.disabled = false;
        rightButton.disabled = true;
    } else {
        const leftButton = document.getElementById("serve-decrease-button");
        const rightButton = document.getElementById("serve-increase-button");
        leftButton.disabled = false;
        rightButton.disabled = false;
    }
}

function updateIngredients(recipe, portions) {
    const ingredientsList = document.querySelector(".portions-list");
    // delete all previous childs
    ingredientsList.innerHTML = "";
    recipe.ingredients.forEach((ingredient) => {
        const ingredientElement = document.createElement("div");
        ingredientElement.classList.add("portion-item");
        ingredientElement.textContent = `${ingredient.quantity * portions} ${
      ingredient.unit
    } ${ingredient.name}`;
        ingredientsList.appendChild(ingredientElement);
    });
}

function searchKeyPress(event) {
    // keyCode 13 is the 'Enter' key
    if (event.keyCode == 13) {
        onSearch();
    }
}

function validateInput(value) {
    const searchButton = document.querySelector(".search-button");
    searchButton.disabled = value === "";
}

function onSearch() {
    const input = document.getElementById("search-input");
    const query = input.value;
    if (query === "") return;
    const url = "../search/index.html?query=" + encodeURIComponent(query);
    window.location.href = url;
}

function onCountChanged(newValue) {
    updateIngredients(recipe, newValue);
}

function displaySimilarRecipes(recipes) {
    let similarRecipes = getSimilarRecipes(recipes);

    const recipesList = document.getElementById("recipe-similars");

    similarRecipes.forEach((element) => {
        let recipeDiv = document.createElement("div");
        recipeDiv.addEventListener("click", function() {
            const url = "./index.html?id=" + element.id;
            window.location.href = url;
        });
        recipeDiv.classList.add(
            "w-64",
            "max-h-125",
            "flex",
            "flex-col",
            "shadow-lg",
            "rounded-lg",
            "min-w-200"
        );
        recipeDiv.innerHTML = `
      <img src="../recipes/${element.image}" alt="${element.name}" onerror="this.onerror=null;this.src='../image-not-found.png';" 
      class="rounded-lg object-cover transition-all duration-500 origin-center aspect-3/4" />
      <div class="p-2 z-10">
        <span class="recipe-title">${element.name}</span>
        <span class="recipe-tag">${element.tags[0]}</span>
        <div class="rating-container">
          <img src="../utilities/star.png" alt="rating" width="16" />
          <span class="recipe-rating">${element.rating}/5</span>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <img src="../utilities/clock.png" alt="clock" width="16" />
          <span class="recipe-duration">${element.cookingTime} min</span>
        </div>
        <div class="flex flex-row gap-1 items-center">
          <img src="../utilities/difficulty.png" alt="difficulty" width="16" />
          <span class="recipe-difficulty">${element.difficulty}</span>
        </div>
      </div>
    `;
        recipesList.append(recipeDiv);
    });
}

function getSimilarRecipes(recipes) {
    const similarRecipes = [];

    for (const element of recipes) {
        const currentRecipe = element;
        const tagsInCommon = currentRecipe.tags.filter((tag) =>
            recipe.tags.includes(tag)
        );
        if (tagsInCommon.length >= 3 && currentRecipe.name !== recipe.name) {
            similarRecipes.push({
                recipe: currentRecipe,
                tagsInCommon: tagsInCommon.length,
            });
        }
    }

    // Sortiere die ähnlichen Rezepte nach Anzahl der übereinstimmenden Tags
    similarRecipes.sort((a, b) => b.tagsInCommon - a.tagsInCommon);

    return similarRecipes.map((r) => r.recipe);
}