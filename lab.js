async function populate() {

    var requestURL = './lab.json';
    var request = new Request(requestURL);

    var response = await fetch(request);
    var superHeroesText = await response.text();

    var superHeroes = JSON.parse(superHeroesText);
    populateHeader(superHeroes);
    populateHeroes(superHeroes);
    
}