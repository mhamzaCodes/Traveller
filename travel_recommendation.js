document.addEventListener('DOMContentLoaded', () => {
    const searchBtn = document.getElementById('searchBtn');
    const clearBtn = document.getElementById('clearBtn');
    const searchInput = document.getElementById('searchInput');
    const resultsContainer = document.getElementById('searchResults');

    // Only run search logic if we are on the Home page (where searchResults exists)
    if (searchBtn && clearBtn && resultsContainer) {
        
        const fetchData = async () => {
            try {
                const response = await fetch('travel_recommendation_api.json');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        const displayResults = (places) => {
            resultsContainer.innerHTML = ''; // Clear previous
            
            if (places.length === 0) {
                resultsContainer.innerHTML = '<p>No recommendations found for this keyword.</p>';
                return;
            }

            places.forEach(place => {
                const card = document.createElement('div');
                card.classList.add('card');
                
                card.innerHTML = `
                    <img src="${place.imageUrl}" alt="${place.name}">
                    <div class="card-content">
                        <h3>${place.name}</h3>
                        <p>${place.description}</p>
                    </div>
                `;
                resultsContainer.appendChild(card);
            });
        };

        searchBtn.addEventListener('click', async () => {
            const query = searchInput.value.toLowerCase().trim();
            const data = await fetchData();
            let results = [];

            if (query.includes('beach')) {
                results = data.beaches;
            } else if (query.includes('temple')) {
                results = data.temples;
            } else if (query.includes('country') || query.includes('australia')) {
                // Extract cities from the matching country (Australia has 2 cities/images)
                results = data.countries[0].cities; 
            }

            displayResults(results);
        });

        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            resultsContainer.innerHTML = '';
        });
    }
});