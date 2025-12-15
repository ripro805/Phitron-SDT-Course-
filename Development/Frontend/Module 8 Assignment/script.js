let groupedDrinks = [];
const MAX_GROUP_SIZE = 7;

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const drinksContainer = document.getElementById('drinksContainer');
const groupList = document.getElementById('groupList');
const groupCount = document.getElementById('groupCount');
const detailsModal = document.getElementById('detailsModal');
const modalBody = document.getElementById('modalBody');

function initApp() {
    loadDefaultDrink();
    setupEventListeners();
}

function setupEventListeners() {
    searchBtn.addEventListener('click', function() {
        performSearch();
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    window.addEventListener('click', function(e) {
        if (e.target === detailsModal) {
            detailsModal.style.display = 'none';
        }
    });
}

function loadDefaultDrink() {
    showLoading();
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita';
    
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            displayDrinks(data.drinks);
        })
        .catch(function(error) {
            console.error('Error loading default drink:', error);
            showError('Failed to load drinks. Please try again.');
        });
}

function performSearch() {
    const searchText = searchInput.value.trim();
    
    if (searchText === '') {
        alert('Please enter a drink name to search');
        return;
    }

    showLoading();
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=' + searchText;
    
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.drinks === null) {
                showNotFound();
            } else {
                displayDrinks(data.drinks);
            }
        })
        .catch(function(error) {
            console.error('Error searching drinks:', error);
            showError('Failed to search drinks. Please try again.');
        });
}

function displayDrinks(drinks) {
    drinksContainer.innerHTML = '';

    if (!drinks || drinks.length === 0) {
        showNotFound();
        return;
    }

    drinks.forEach(function(drink) {
        const drinkCard = createDrinkCard(drink);
        drinksContainer.appendChild(drinkCard);
    });
}

function createDrinkCard(drink) {
    const card = document.createElement('div');
    card.className = 'drink-card';

    const instructions = drink.strInstructions 
        ? drink.strInstructions.substring(0, 50) + '...' 
        : 'No instructions available...';

    const isAdded = groupedDrinks.some(function(d) {
        return d.id === drink.idDrink;
    });

    const buttonText = isAdded ? 'Already Selected' : 'Add to Cart';
    const buttonClass = isAdded ? 'btn btn-group btn-added' : 'btn btn-group';
    const buttonDisabled = isAdded ? 'disabled' : '';

    card.innerHTML = `
        <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="drink-image">
        <div class="drink-info">
            <p class="drink-label">Name: <span class="drink-value">${drink.strDrink}</span></p>
            <p class="drink-label">Category: <span class="drink-value">${drink.strCategory || 'Unknown Category'}</span></p>
            <p class="drink-label">Instructions: <span class="drink-value">${instructions}</span></p>
            <div class="drink-buttons">
                <button class="${buttonClass}" onclick="addToGroup('${drink.idDrink}', '${drink.strDrink}')" ${buttonDisabled}>
                    ${buttonText}
                </button>
                <button class="btn btn-details" onclick="showDetails('${drink.idDrink}')">
                    Details
                </button>
            </div>
        </div>
    `;

    return card;
}

function addToGroup(drinkId, drinkName) {
    if (groupedDrinks.length >= MAX_GROUP_SIZE) {
        alert('You cannot add more than 7 drinks');
        return;
    }

    const alreadyAdded = groupedDrinks.some(function(drink) {
        return drink.id === drinkId;
    });

    if (alreadyAdded) {
        alert('This drink is already in your group');
        return;
    }

    const drinkCard = document.querySelector(`button[onclick*="'${drinkId}'"]`);
    let drinkImage = '';
    if (drinkCard) {
        const card = drinkCard.closest('.drink-card');
        const img = card.querySelector('.drink-image');
        if (img) {
            drinkImage = img.src;
        }
    }

    groupedDrinks.push({
        id: drinkId,
        name: drinkName,
        image: drinkImage
    });

    updateGroupDisplay();
    
    refreshDrinkCards();
}

function refreshDrinkCards() {
    const currentDrinks = Array.from(drinksContainer.querySelectorAll('.drink-card'));
    
    if (currentDrinks.length > 0) {
        const searchText = searchInput.value.trim();
        if (searchText !== '') {
            performSearch();
        } else {
            loadDefaultDrink();
        }
    }
}

function updateGroupDisplay() {
    groupCount.textContent = groupedDrinks.length;

    groupList.innerHTML = '';

    if (groupedDrinks.length === 0) {
        groupList.innerHTML = '<p class="empty-message">No drinks added yet</p>';
        return;
    }

    groupedDrinks.forEach(function(drink, index) {
        const groupItem = document.createElement('div');
        groupItem.className = 'group-item';
        groupItem.innerHTML = `
            <div class="group-item-number">${index + 1}</div>
            <div class="group-item-img">
                <img src="${drink.image}" alt="${drink.name}">
            </div>
            <div class="group-item-name">${drink.name}</div>
        `;
        groupList.appendChild(groupItem);
    });
}

function showDetails(drinkId) {
    detailsModal.style.display = 'block';

    modalBody.innerHTML = '<div class="loading"><div class="spinner"></div></div>';

    const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=' + drinkId;
    
    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.drinks && data.drinks.length > 0) {
                displayDrinkDetails(data.drinks[0]);
            } else {
                modalBody.innerHTML = '<p>Details not found</p>';
            }
        })
        .catch(function(error) {
            console.error('Error loading drink details:', error);
            modalBody.innerHTML = '<p>Failed to load details. Please try again.</p>';
        });
}

function displayDrinkDetails(drink) {
    modalBody.innerHTML = `
        <div class="modal-header">
            <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}" class="modal-image">
        </div>
        <div class="modal-body">
            <h2 class="modal-heading">${drink.strDrink}</h2>
            
            <div class="modal-info-box">
                <h3 class="details-title">Details</h3>
                <p class="modal-info-item"><strong>Category:</strong> ${drink.strCategory || 'N/A'}</p>
                <p class="modal-info-item"><strong>Alcoholic:</strong> ${drink.strAlcoholic || 'N/A'}</p>
                <p class="modal-description">${drink.strInstructions || 'No instructions available'}</p>
            </div>
            
            <button class="modal-close-btn" onclick="closeModalWindow()">Close</button>
        </div>
    `;
}

function showLoading() {
    drinksContainer.innerHTML = `
        <div class="loading">
            <div class="spinner"></div>
            <p>Loading drinks...</p>
        </div>
    `;
}

function showNotFound() {
    drinksContainer.innerHTML = `
        <div class="not-found">
            <p>Your searched drink is not found.</p>
        </div>
    `;
}

function showError(message) {
    drinksContainer.innerHTML = `
        <div class="not-found">
            <h2>⚠️ Error</h2>
            <p>${message}</p>
        </div>
    `;
}

function closeModalWindow() {
    detailsModal.style.display = 'none';
}

window.onload = function() {
    initApp();
};
