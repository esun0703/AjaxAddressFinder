// VARIABLES
// ====================================================================================
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
// variable to hold our array
const cities = []
// grab classes
const search = document.querySelector('.search')
const suggestions = document.querySelector('.suggestions');

// FUNCTIONS
// ====================================================================================
// 1. Need to make an AJAX call with FETCH to get list of cities
fetch(endpoint)
    // retreive information in json format
    .then(blob => blob.json())
    // need to take that list of cities and push it to the array 'cities';
    .then(data => cities.push(...data));
// console.log(cities) //check to see if cities has been updated


// 2. Need to take a word and filter array of cities to find entries that match
const findMatch = (word, cities) => {
    // console.log(word);
    // 1. return a filter through the cities array
    return cities.filter(place => {
        // need a regex so you can input variable into match
        const regex = new RegExp(word, 'gi');
        return place.city.match(regex) || place.state.match(regex);
    });
}
// practice calling:  findMatch('bos', cities);

// 3. Change numbers to have commas
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// 4.  Need to display the matched array to the DOM
function displayMatch() {
    const searchWord = this.value;
    // console.log('searched word:', searchWord);

    // 1. call word match function with given input
    const matchArray = findMatch(searchWord, cities);
    // console.log(matchArray); //just making sure it workd
    
    // 2. iterate through the new array to create entries and join so that each entry is a string
    const html = matchArray.map(place => {
        // console.log(place);
        // new list items for each place
        // create highlighting feature which requires .replace method
        const regex = new RegExp(searchWord, 'gi');
        const cityName = place.city.replace(regex, `<span class="hl">${searchWord}</span>`);
        const stateName = place.state.replace(regex, `<span class="hl">${searchWord}</span>`);
        return (
            // `<li>
            //     <span class="name">${place.city}, ${place.state}</span>
            //     <span class="population">${place.population}</span>
            // </li>`
            `<li>
                            <span class="name">${cityName}, ${stateName}</span>
                            <span class="population">${numberWithCommas(place.population)}</span>
                        </li>`
        );
    }).join('');
    // 3. display on suggestions portion
    // console.log(html);
    suggestions.innerHTML = html;
}

// CALLBACKS
// ====================================================================================
// Call the functions with event handlers
search.addEventListener('change', displayMatch);
search.addEventListener('keyup', displayMatch);