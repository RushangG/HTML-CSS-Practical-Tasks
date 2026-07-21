//global variable 
let editIndex = null; //to keep track edit or add new recipe

//add recipe to local storage function 

async function addRecipe(recipe, index = null) {
    //array to store recipes in local storage


    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    if (index !== null) {
        recipes[index] = recipe; // update recipe.


    }
    else {
        recipes.push(recipe); // add new  recipe to the array.
    }
    localStorage.setItem('recipes', JSON.stringify(recipes));
}





// display recipes in table
async function displayRecipes(filteredRecipes = null) {

    document.getElementById('button-add').textContent = 'Add Recipe';
    const recipeListBody = document.getElementById('recipeListBody');
    if (!recipeListBody) return;

    recipeListBody.innerHTML = ''; // Clear existing rows

    let recipes = [];

    if (filteredRecipes !== null) {
        recipes = filteredRecipes; // Use filtered recipes if provided
    }
    else {
        recipes = JSON.parse(localStorage.getItem('recipes')) || [];
    }


    if (recipes.length === 0) {
        recipeListBody.innerHTML = `
                <tr>
                    <td colspan="10">
                        No recipes available.
                    </td>
                </tr>`;
        return;
    }

    recipes.forEach((recipe, index) => {
        const recipeRow = document.createElement('tr');

        recipeRow.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${recipe.name}</td>
                    <td>${recipe.category}</td>
                    <td>${recipe.ingredients}</td>
                    <td>${recipe.instructions}</td>
                    <td>
                        <button onclick="editRecipe(${index})">Edit</button>
                        <button onclick="deleteRecipe(${index})">Delete</button>

                    </td>

                `;
        recipeListBody.appendChild(recipeRow);


    })

}

//delete recipes 
async function deleteRecipe(index) {
    if (confirm("Are you sure you want to delete this recipe?")) {

        let recipes = JSON.parse(localStorage.getItem('recipes')) || [];
        recipes.splice(index, 1); //remove the recipe at the specified index .splice(index to remove,up to item n);
        localStorage.setItem('recipes', JSON.stringify(recipes));


        await displayRecipes();
    }
    else {
        await displayRecipes();
    }


}

// update recipe function
async function editRecipe(index) {

    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const recipe = recipes[index];

    if (!recipe) return; // If recipe doesn't exist, exit the function

    // fill the form with the recipe data
    document.getElementById('recipeName').value = recipe.name;
    document.getElementById('category').value = recipe.category;
    document.getElementById('ingredients').value = recipe.ingredients;
    document.getElementById('instructions').value = recipe.instructions;

    document.getElementById('button-add').textContent = 'Update Recipe';

    // update add existing index of the recipe in the array

    editIndex = index; // Store the index of the recipe being edited

}

// search function for specific recipe by ingredients
async function searchRecipes() {

    const searchInput = document.getElementById('search-input').value.toLowerCase();
    const recipeListBody = document.getElementById('recipeListBody');
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const filterRecipes = recipes.filter(
        recipe => recipe.ingredients.toLowerCase().includes(searchInput)
    )

    displayRecipes(filterRecipes); // Display filtered recipes       

}

//category filter function 
async function selectCategory() {
    const category = document.getElementById('category-search').value;
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    if (category === "") {
        displayRecipes(); // Display all recipes 
        return;
    }

    const filteredRecipes = recipes.filter(recipe => recipe.category === category);

    displayRecipes(filteredRecipes);
}



document.addEventListener('DOMContentLoaded', () => displayRecipes());

document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('recipe-form');

    form.addEventListener('submit', async function (event) {
        event.preventDefault();

        const recipeName = document.getElementById('recipeName').value;
        const category = document.getElementById("category").value;
        const ingredients = document.getElementById('ingredients').value;
        const instructions = document.getElementById('instructions').value;

        const recipe = {
            name: recipeName,
            category: category,
            ingredients: ingredients,
            instructions: instructions
        }

        if (editIndex !== null) {
            await addRecipe(recipe, editIndex); // update 
            editIndex = null; // null after updating
        }
        else {
            await addRecipe(recipe); // add new recipe
        }


        displayRecipes();


        form.reset();

    })
});


