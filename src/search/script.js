async function loadRecipes() {
  try {
    const response = await fetch("../data.json");
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error(error);
  }
}

window.onload = () => {
  const icon = document.getElementById("icon");
  icon.addEventListener("click", () => {
    window.location.href = "..";
  });

  // get query from url
  var params = new URLSearchParams(window.location.search);
  var query = params.get("query");
  // update search input manually
  const input = document.getElementById("search-input");
  input.value = query;
  input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      const input = document.getElementById("search-input");
      const query = input.value;
      const url = "./index.html?query=" + encodeURIComponent(query);
      window.location.href = url;
    }
  });
  updateFilter();

  [
    "duration",
    "rating",
    "germany",
    "italy",
    "spain",
    "france",
    "japan",
    "america",
    "healthy",
    "vegetarian",
    "summer",
    "dinner",
    "low-calorie",
    "classic",
  ].forEach((filter) => {
    document
      .getElementById(filter)
      .addEventListener("change", () => updateFilter());
  });
};

function updateFilter() {
  const name = document.getElementById("search-input").value;
  const minimalRating = document.getElementById("rating").value;
  const maximalDuration = document.getElementById("duration").value;
  const selectedCheckBoxes = Array.from(
    document.querySelectorAll("input[type=checkbox]:checked")
  ).map((c) => c.name);

  console.log(selectedCheckBoxes);

  loadRecipes().then(
    (recipes) => {
      const filteredRecipes = recipes.filter(
        (r) =>
          r.name.toLowerCase().includes(name.toLowerCase()) &&
          r.rating >= minimalRating &&
          r.cookingTime <= maximalDuration &&
          selectedCheckBoxes.every((selectedCheckBox) => {
            return r.tags
              .map((t) => t.toLowerCase())
              .includes(selectedCheckBox.toLowerCase());
          })
      );
      displayRecipes(filteredRecipes, ".filtered-recipes, .recipes-list");
    },
    (error) => {
      console.error(error);
    }
  );
}

function displayRecipes(recipes, listSelector) {
  const recipesList = document.querySelector(listSelector);
  while (recipesList.firstChild) {
    recipesList.removeChild(recipesList.firstChild);
  }
  recipes.forEach((element) => {
    let recipeDiv = document.createElement("div");
    recipeDiv.addEventListener("click", function () {
      onClick(element.id);
    });
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
        <img src="../recipes/${element.image}" alt="${element.name}" onerror="this.onerror=null;this.src='../utilities/image-not-found.png';" />
        <div class="recipe-content">
          <span class="recipe-title">${element.name}</span>
          <span class="recipe-tag">${element.tags[0]}</span>
          <div class="rating-container">
            <img src="../utilities/star.png" alt="rating" width="16" />
            <span class="recipe-rating">${element.rating}/5</span>
          </div>
          <div class="duration-difficulty-container">
            <img src="../utilities/clock.png" alt="clock" width="16" />
            <span class="recipe-duration">${element.cookingTime} min</span>
            <img src="../utilities/difficulty.png" alt="difficulty" width="16" />
            <span class="recipe-difficulty">${element.difficulty}</span>
          </div>
        </div>
      `;
    recipesList.append(recipeDiv);
  });
}

function displayNotFoundImage() {
  var img = document.getElementById("image");
  img.onerror = null;
  img.src = "image-not-found.png";
}

function onClick(id) {
  const url = "../recipe/index.html?id=" + id;
  window.location.href = url;
}
