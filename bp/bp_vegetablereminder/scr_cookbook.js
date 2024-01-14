const allRecipes = [
    {
        id: "00",
        recipeTitle: "Grilled Chicken Salad",
        vitaminList: ["A", "B1", "E"],
        shortDesc: "A refreshing salad with grilled chicken.",
        tags: "🟩 | 🥩 🌿",
        steps: ["Step 1: Grill chicken", "Step 2: Chop vegetables", "Step 3: Toss everything", "DONE"]
    },
    {
        id: "01",
        recipeTitle: "Vegetarian Stir Fry",
        vitaminList: ["A", "K", "E"],
        shortDesc: "A quick and easy stir fry with a variety of vegetables.",
        tags: "🟩 |🌿",
        steps: ["Step 1: Sauté vegetables", "Step 2: Add sauce", "DONE"]
    },
    {
        id: "02",
        recipeTitle: "Beef and Broccoli Stir Fry",
        vitaminList: ["B7", "B12", "K"],
        shortDesc: "A flavorful stir fry with tender beef and broccoli.",
        tags: "🟨 🟨 | 🥩 🌿",
        steps: ["Step 1: Marinate beef", "Step 2: Sauté beef and broccoli", "Step 3: Add sauce", "DONE"]
    },
    {
        id: "03",
        recipeTitle: "Mushroom Risotto",
        vitaminList: ["C", "D", "E"],
        shortDesc: "Creamy risotto with mushrooms and a touch of Parmesan.",
        tags: "🟩 | 🌿",
        steps: ["Step 1: Sauté mushrooms", "Step 2: Cook risotto rice", "Step 3: Add broth gradually", "DONE"]
    },
    {
        id: "04",
        recipeTitle: "Chef's Special Seafood Pasta",
        vitaminList: ["A", "B6", "D"],
        shortDesc: "A delectable seafood pasta prepared with the chef's special sauce.",
        tags: "🟥 🟥 🟥 | 🌿",
        steps: ["Step 1: Cook pasta", "Step 2: Sauté seafood", "Step 3: Combine with sauce", "DONE"]
    },
    {
        id: "05",
        recipeTitle: "Mediterranean Quinoa Bowl",
        vitaminList: ["A", "B7", "B12"],
        shortDesc: "A nutritious quinoa bowl with Mediterranean flavors.",
        tags: "🟨 🟨 | 🌿",
        steps: ["Step 1: Cook quinoa", "Step 2: Assemble bowl with veggies", "Step 3: Add dressing", "DONE"]
    },
    {
        id: "06",
        recipeTitle: "Superfood Smoothie Bowl",
        vitaminList: ["A", "B7", "B12", "E", "K"],
        shortDesc: "A nutrient-packed smoothie bowl with superfood toppings.",
        tags: "🟩 | 🌿",
        steps: ["Step 1: Blend smoothie ingredients", "Step 2: Pour into a bowl", "Step 3: Add toppings", "DONE"]
    }
];


function showRecipe(recipeId) {
  const recipe = allRecipes.find(recipe => recipe.id === recipeId);
  console.log('Showing recipe with ID:', recipeId);
  document.getElementById('id_recipe_details').style.display="block";
  document.getElementById('id_recipe_title').innerText = recipe.recipeTitle;

  const stepDiv = document.getElementById('id_recipe_steps_div');
  stepDiv.innerHTML = "";

  const recipeSteps= recipe.steps;

  let i = 1;
  recipeSteps.forEach(step => {
    const spanElement = document.createElement('span');
    spanElement.textContent = i +". "+step;
    spanElement.className = "cl_recipe_step";
    i+=1;

    stepDiv.appendChild(spanElement);
  });

  
  document.getElementById('id_recipe_eat_button').setAttribute('onclick',`eat_food('${recipe.id}')`)
}

function closeRecipe(){
  document.getElementById('id_recipe_details').style.display="none";
}

function eat_food(id){
  const food = allRecipes.find(recipe => recipe.id === id);
  const recipeVits= food.vitaminList;


  recipeVits.forEach(vit => {
    updateVitamin(vit,+20);
  });
  closeRecipe();
}

function showAllRecipes() {
  const cookbookContainer = document.getElementById('id_recipe_list');
  cookbookContainer.innerHTML ="";

  allRecipes.forEach(recipe => {
    const recipeElement = document.createElement('div');
    recipeElement.className = 'cl_cb_recipe';
    recipeElement.id = `r_id_${recipe.id}`;

    const titleElement = document.createElement('span');
    titleElement.className = 'cl_cb_recipe_title';
    titleElement.textContent = recipe.recipeTitle +" "+recipe.tags;

    const vitDescElement = document.createElement('span');
    vitDescElement.className = 'cl_cb_vit_desc';
    vitDescElement.textContent = `Vitamins: ${recipe.vitaminList.join(', ')}`;

    const mealDescElement = document.createElement('span');
    mealDescElement.className = 'cl_cb_meal_desc';
    mealDescElement.textContent = recipe.shortDesc;

    const viewRecipeButton = document.createElement('button');
    viewRecipeButton.className = 'cl_cb_button_view_recipe';
    viewRecipeButton.textContent = 'View Recipe';
    viewRecipeButton.addEventListener('click', () => showRecipe(recipe.id));

    recipeElement.appendChild(titleElement);
    recipeElement.appendChild(vitDescElement);
    recipeElement.appendChild(mealDescElement);
    recipeElement.appendChild(viewRecipeButton);

    cookbookContainer.appendChild(recipeElement);
  });
}

function createFilterBox(vitamin,activeVit) {
  const filterBox = document.createElement('label');
  filterBox.innerText = vitamin;
  filterBox.className = 'cl_label_filter';

  const filterInput = document.createElement('input');
  filterInput.setAttribute('type','checkbox');
  filterInput.setAttribute('value',vitamin);
  filterInput.setAttribute('id',`id_cbox_${vitamin}`);
  if (activeVit) {
    filterInput.setAttribute('checked', 'checked');
  }

  filterBox.appendChild(filterInput);
  return filterBox;
}

function loadFilter(activeVit) {
  const filterbar = document.getElementById('id_recipe_filterbar');
  filterbar.innerHTML ="";

  vitaminsData.forEach(vitamin => {
    if (vitamin.name === activeVit) {
      filterbar.appendChild(createFilterBox(vitamin.name,true));
    }
    else{
      filterbar.appendChild(createFilterBox(vitamin.name));
    }
  });
}


