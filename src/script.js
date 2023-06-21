const displayedTags = [
  "Breakfast",
  "Brunch",
  "Lunch",
  "Dinner",
  "Snacks",
  "Appetizers",
  "Main Courses",
  "Desserts",
  "Sweets",
  "Party Snacks",
];

let selectedButton;

window.onload = () => {
  const input = document.getElementById("search-input");
  input.addEventListener("keypress", (event) => {
    if (event.key == "Enter") {
      const input = document.getElementById("search-input");
      const query = input.value;
      if (query === "") return;
      const url = "search/index.html?query=" + encodeURIComponent(query);
      window.location.href = url;
    }
  });
};

async function loadRecipes() {
  try {
    const response = await fetch("./data.json");
    const recipes = await response.json();
    return recipes;
  } catch (error) {
    console.error(error);
  }
}

loadRecipes()
  .then((recipes) => {
    displayTags(recipes);
    displayCarousel(recipes);
    displayRecipesWithTag(recipes, selectedButton.textContent);
  })
  .catch((error) => {
    console.error("Error loading recipes: ", error);
  });

function displayRecipesWithTag(recipes, tag) {
  const classicRecipesList = document.querySelector(
    ".tagged-recipes .recipes-list"
  );
  classicRecipesList.innerHTML = "";
  setTimeout(() => {
    recipes
      .filter((r) => r.tags.includes(tag))
      .forEach((element) => {
        let recipeDiv = document.createElement("div");
        recipeDiv.addEventListener("click", function () {
          const url = "recipe/index.html?id=" + element.id;
          window.location.href = url;
        });
        recipeDiv.classList.add(
          "recipe",
          "w-calc-1/2",
          "min-w-150",
          "flex-grow"
        );
        recipeDiv.innerHTML = `
            <img src="../recipes/${element.image}" alt="${element.name}" onerror="this.onerror=null;this.src='../utilities/image-not-found.png';" />
            <div class="recipe-content">
            <span class="recipe-title">${element.name}</span>
            <span class="recipe-tag">${element.tags[0]}</span>
            <div class="rating-container flex flex-row items-center gap-2">
                <img src="utilities/star.png" alt="rating" width="16" />
                <span class="recipe-rating">${element.rating}/5</span>
            </div>
            <div class="duration-difficulty-container flex flex-row flex-wrap items-center gap-2">
                <img src="utilities/clock.png" alt="clock" width="16" />
                <span class="recipe-duration">${element.cookingTime} min</span>
            </div>
            <div class="difficulty-container flex flex-row items-center gap-2">
                <img src="utilities/difficulty.png" alt="difficulty" width="16" />
                <span class="recipe-difficulty">${element.difficulty}</span>
            </div>
            </div>
        `;
        classicRecipesList.append(recipeDiv);
      });
    /** Dont let the card on the last row grow by adding another invisible card */
    if (
      screen.width < 600 &&
      recipes.filter((r) => r.tags.includes(tag)).length % 2 == 1
    ) {
      const filler = classicRecipesList.lastChild.cloneNode(true);
      filler.classList.add("invisible");
      classicRecipesList.append(filler);
    }
  }, 10);
}

function displayTags(recipes) {
  const tagsDiv = document.getElementById("tags");
  displayedTags.forEach((tag, index) => {
    const button = document.createElement("button");
    if (index === 0) {
      selectedButton = button;
    }
    button.addEventListener("click", () => {
      selectedButton = button;
      updateButtonState();
      displayRecipesWithTag(recipes, selectedButton.textContent);
    });
    button.classList.add(
      "rounded-lg",
      "p-1",
      "shadow-md",
      "whitespace-nowrap",
      "bg-gray-100",
      "tag-button"
    );
    updateButtonState();
    button.textContent = tag;
    tagsDiv.appendChild(button);
  });
}

function updateButtonState() {
  const buttons = document.getElementsByClassName("tag-button");
  Array.from(buttons).forEach((button) => {
    if (selectedButton === button) {
      button.classList.add("bg-orange-400");
    } else {
      button.classList.remove("bg-orange-400");
    }
  });
}

function displayCarousel(recipes) {
  const slider = document.querySelector(".slider");
  const testimonialDiv = document.createElement("div");
  testimonialDiv.classList.add(
    "testimonials",
    "flex",
    "items-center",
    "justify-center",
    "relative",
    "min-h-350",
    "overflow-hidden",
    "h-375"
  );

  recipes.slice(0, 9).forEach((recipe, index) => {
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "testimonial";
    input.id = "t-" + index;
    if (index === 0) {
      input.checked = true;
    }
    slider.appendChild(input);

    const buttonId = "recipe-button-" + (index + 1);

    const label = document.createElement("label");
    label.classList.add("item");
    label.setAttribute("for", "t-" + index);

    const recipeDiv = document.createElement("div");
    recipeDiv.classList.add("recipe");

    const img = document.createElement("img");
    img.src = "recipes/" + recipe.image;
    img.alt = recipe.name;
    img.onerror = function () {
      this.onerror = null;
      this.src = "/utilities/image-not-found.png";
    };

    const recipeContentDiv = document.createElement("div");
    recipeContentDiv.classList.add("recipe-content");

    const recipeTitleSpan = document.createElement("span");
    recipeTitleSpan.classList.add("font-bold", "truncate", "text-lg");
    recipeTitleSpan.textContent = recipe.name;

    const button = document.createElement("button");
    button.id = buttonId;
    button.classList.add("hidden");
    button.textContent = "Choose";

    button.addEventListener("click", () => {
      const url = "recipe/index.html?id=" + (index + 1);
      window.location.href = url;
    });

    recipeContentDiv.appendChild(recipeTitleSpan);
    recipeContentDiv.appendChild(button);

    recipeDiv.appendChild(img);
    recipeDiv.appendChild(recipeContentDiv);

    label.appendChild(recipeDiv);
    testimonialDiv.appendChild(label);
  });

  slider.appendChild(testimonialDiv);
}

function getNextIndex(currentIndex, direction) {
  if (currentIndex === 0 && direction === "left") return 8;
  if (direction === "left") return currentIndex - 1;
  if (currentIndex === 8 && direction === "right") return 0;
  if (direction === "right") return currentIndex + 1;
}

function displayRecipes(recipes, listSelector) {
  recipes.slice(0, 5).forEach((element, index) => {
    const classicRecipesList = document.querySelector(listSelector);
    let recipeDiv = document.createElement("div");
    recipeDiv.addEventListener("click", function () {
      const url = "recipe/index.html?id=" + (index + 1);
      window.location.href = url;
    });
    recipeDiv.classList.add("recipe");
    recipeDiv.innerHTML = `
      <img src="recipes/${element.image}" alt="${element.name}" onerror="this.onerror=null;this.src='image-not-found.png';" />
      <div class="recipe-content">
        <span class="recipe-title">${element.name}</span>
        <span class="recipe-tag">${element.tags[0]}</span>
        <div class="rating-container">
          <img src="utilities/star.png" alt="rating" width="16" />
          <span class="recipe-rating">${element.rating}/5</span>
        </div>
        <div class="duration-difficulty-container">
          <img src="utilities/clock.png" alt="clock" width="16" />
          <span class="recipe-duration">${element.cookingTime} min</span>
          <img src="utilities/difficulty.png" alt="difficulty" width="16" />
          <span class="recipe-difficulty">${element.difficulty}</span>
        </div>
      </div>
    `;
    classicRecipesList.append(recipeDiv);
  });
}

function getAllUniqueTags(recipes) {
  const uniqueTags = new Set();
  recipes.forEach((recipe) => {
    recipe.tags.forEach((tag) => {
      uniqueTags.add(tag);
    });
  });
  return Array.from(uniqueTags);
}
