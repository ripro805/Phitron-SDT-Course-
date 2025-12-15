// DOM Elements
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const mealsGrid = document.getElementById('mealsGrid');
const loadingSpinner = document.getElementById('loadingSpinner');
const notFoundMessage = document.getElementById('notFoundMessage');
const mealDetailsCard = document.getElementById('mealDetailsCard');
const closeBtn = document.getElementById('closeBtn');

// API Base URL
const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Search meals by name or first letter
 * @param {string} query - Search text entered by user
 */
async function searchMeals(query) {
    // Clear previous results
    mealsGrid.innerHTML = '';
    notFoundMessage.classList.add('hidden');
    
    // If search is empty, return
    if (!query.trim()) {
        return;
    }

    // Show loading spinner
    loadingSpinner.classList.remove('hidden');

    try {
        // Determine which API endpoint to use
        let url;
        if (query.length === 1) {
            // Single letter search
            url = `${API_BASE_URL}/search.php?f=${query}`;
        } else {
            // Multi-character search
            url = `${API_BASE_URL}/search.php?s=${query}`;
        }

        // Fetch data from API
        const response = await fetch(url);
        const data = await response.json();

        // Hide loading spinner
        loadingSpinner.classList.add('hidden');

        // Check if meals found
        if (data.meals) {
            displayMeals(data.meals);
        } else {
            // No results found
            notFoundMessage.classList.remove('hidden');
        }
    } catch (error) {
        // Handle errors
        console.error('Error fetching meals:', error);
        loadingSpinner.classList.add('hidden');
        notFoundMessage.classList.remove('hidden');
    }
}

/**
 * Display meals in grid
 * @param {Array} meals - Array of meal objects
 */
function displayMeals(meals) {
    mealsGrid.innerHTML = '';

    meals.forEach(meal => {
        // Create meal card
        const mealCard = document.createElement('div');
        mealCard.className = 'meal-card';
        mealCard.onclick = () => getMealDetails(meal.idMeal);

        mealCard.innerHTML = `
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
            <div class="meal-info">
                <h3>${meal.strMeal}</h3>
                <p>${meal.strCategory || ''}</p>
            </div>
        `;

        mealsGrid.appendChild(mealCard);
    });
}

/**
 * Fetch and display full meal details
 * @param {string} mealId - ID of the selected meal
 */
async function getMealDetails(mealId) {
    // Show loading spinner
    loadingSpinner.classList.remove('hidden');

    try {
        // Fetch meal details by ID
        const response = await fetch(`${API_BASE_URL}/lookup.php?i=${mealId}`);
        const data = await response.json();

        // Hide loading spinner
        loadingSpinner.classList.add('hidden');

        if (data.meals) {
            displayMealDetails(data.meals[0]);
        }
    } catch (error) {
        console.error('Error fetching meal details:', error);
        loadingSpinner.classList.add('hidden');
    }
}

/**
 * Display full meal details in card
 * @param {Object} meal - Meal object with full details
 */
function displayMealDetails(meal) {
    // Populate details card
    document.getElementById('detailsImage').src = meal.strMealThumb;
    document.getElementById('detailsName').textContent = meal.strMeal;
    document.getElementById('detailsCategory').textContent = meal.strCategory;
    document.getElementById('detailsArea').textContent = meal.strArea;
    document.getElementById('detailsInstructions').textContent = meal.strInstructions;

    // Get ingredients list
    const ingredientsList = document.getElementById('ingredientsList');
    ingredientsList.innerHTML = '';

    // Loop through ingredients (up to 20)
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];

        if (ingredient && ingredient.trim()) {
            const li = document.createElement('li');
            li.textContent = `${measure} ${ingredient}`;
            ingredientsList.appendChild(li);
        }
    }

    // Show details card with smooth scroll
    mealDetailsCard.classList.remove('hidden');
    mealDetailsCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

/**
 * Close meal details card
 */
function closeMealDetails() {
    mealDetailsCard.classList.add('hidden');
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    searchMeals(searchInput.value);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchMeals(searchInput.value);
    }
});

// Real-time search as user types (optional)
searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    
    // Clear results if input is empty
    if (!query.trim()) {
        mealsGrid.innerHTML = '';
        notFoundMessage.classList.add('hidden');
        mealDetailsCard.classList.add('hidden');
    }
});

closeBtn.addEventListener('click', closeMealDetails);

// Initial message (optional)
console.log('🍽️ Meal Search App loaded successfully!');
