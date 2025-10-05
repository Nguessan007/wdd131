const recipes = [
    {
      name: "Quinoa & Veggie Salad",
      ingredients: ["Quinoa", "Cucumber", "Tomato", "Lemon Dressing"],
      instructions: "Cook quinoa, chop vegetables, mix with dressing.",
      tags: ["Vegetarian", "Gluten-Free"],
      image: "images/quinoa-salad.jpg" // Store image URL or base64 string
    },
    // Add more recipes here
  ];
  
  const recipesContainer = document.getElementById("recipes-container");
  const searchInput = document.getElementById("search-input");
  const dietFilter = document.getElementById("diet-filter");
  
  function filterRecipes() {
    const searchQuery = searchInput.value.toLowerCase();
    const selectedDiet = dietFilter.value;
  
    const filteredRecipes = recipes.filter(recipe => {
      const matchesSearch = recipe.name.toLowerCase().includes(searchQuery) ||
                            recipe.ingredients.some(ingredient => ingredient.toLowerCase().includes(searchQuery));
      const matchesDiet = selectedDiet ? recipe.tags.includes(selectedDiet) : true;
  
      return matchesSearch && matchesDiet;
    });
  
    displayRecipes(filteredRecipes);
  }
  
  function displayRecipes(filteredRecipes) {
    recipesContainer.innerHTML = "";
    filteredRecipes.forEach(recipe => {
      const recipeCard = document.createElement("article");
      recipeCard.classList.add("recipe-card");
  
      recipeCard.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}" loading="lazy">
        <h3>${recipe.name}</h3>
        <p>${recipe.instructions.replace(/\n/g, '<br>')}</p>
        <a href="#">View Recipe</a>
      `;
  
      recipesContainer.appendChild(recipeCard);
    });
  }
  
  searchInput.addEventListener("input", filterRecipes);
  dietFilter.addEventListener("change", filterRecipes);
  
  const submitForm = document.getElementById("submit-form");
  
  submitForm.addEventListener("submit", function(event) {
    event.preventDefault();
  
    const formData = new FormData(submitForm);
    const newRecipe = {
      name: formData.get("name"),
      ingredients: formData.get("ingredients").split("\n"),
      instructions: formData.get("instructions"),
      tags: formData.get("tags").split(",").map(tag => tag.trim()),
      image: formData.get("image").name // Store image URL or base64 string
    };
  
    const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
    savedRecipes.push(newRecipe);
    localStorage.setItem("recipes", JSON.stringify(savedRecipes));
  
    alert("Recipe submitted successfully!");
    submitForm.reset();
  });
  
  const savedRecipes = JSON.parse(localStorage.getItem("recipes")) || [];
  const allRecipes = [...recipes, ...savedRecipes];
  
  displayRecipes(allRecipes);
  
  