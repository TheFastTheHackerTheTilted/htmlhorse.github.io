const allRecipes = [
	{id:"00", recipeTitle: "Test Recipe", vitaminList: ["A","B1","E"],shortDesc:"This test meal is nice!", recipe:["Step 1:...","Step 2:...", "Step 3:...", "DONE"]},
	{id:"01", recipeTitle: "Test Recipe 2", vitaminList: ["A","K","E"],shortDesc:"This other meal is easier!", recipe:["Step 1:...","Step 2:...", "DONE"]},
	{id:"02", recipeTitle: "Beef Recipe", vitaminList: ["B7","B12","K"],shortDesc:"This test meal has meat!", recipe:["Step 1:...","Step 2:...", "Step 3:...", "DONE"]},
	{id:"03", recipeTitle: "Shroom Recipe", vitaminList: ["C","D","E"],shortDesc:"This test meal feels nice!", recipe:["Step 1:...","Step 2:...", "Step 3:...", "DONE"]},
	{id:"04", recipeTitle: "Special Recipe", vitaminList: ["A","B6","D"],shortDesc:"This test meal is chef's special!", recipe:["Step 1:...","Step 2:...", "Step 3:...", "DONE"]},
	{id:"05", recipeTitle: "Another Recipe", vitaminList: ["A","B7","B12"],shortDesc:"This test meal is an extra!", recipe:["Step 1:...","Step 2:...", "Step 3:...", "DONE"]},
	{id:"06", recipeTitle: "Super Recipe", vitaminList: ["A","B7","B12","E","K"],shortDesc:"This test meal is ultra good!", recipe:["Step 1:...","Step 2:...", "Step 3:...", "DONE"]},

	]

function showRecipe(recipeId) {
  // Your showRecipe function implementation here
  console.log('Showing recipe with ID:', recipeId);
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
    titleElement.textContent = recipe.recipeTitle;

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

function createFilterBox(vitamin) {
  const filterBox = document.createElement('label');
  filterBox.innerText = vitamin;
  filterBox.className = 'cl_label_filter';

  const filterInput = document.createElement('input');
  filterInput.setAttribute('type','checkbox');
  filterInput.setAttribute('value',vitamin);
  filterInput.setAttribute('id',`id_cbox_${vitamin}`);

  filterBox.appendChild(filterInput);
  return filterBox;
}

function loadFilter() {
  const filterbar = document.getElementById('id_recipe_filterbar');
  filterbar.innerHTML ="";

  vitaminsData.forEach(vitamin => {
    filterbar.appendChild(createFilterBox(vitamin.name));
  });
}
