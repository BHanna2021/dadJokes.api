//using https://icanhazdadjoke.com/api with no api key
//maybe have two?  random dad joke (json) and search for dad joke using page, limit (20 default, 30 max), term (default is list all jokes) (json or text)
//img of dad and baby laughing "dad jokes" https://images.unsplash.com/photo-1596510914841-40223e421e29?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80
// per their api specs need to set up a custom user-agent to identify the program using it.  Example: curl -H "User-Agent: My Library (https://github.com/username/repo)" https://icanhazdadjoke.com/ (this would be for random joke).  search for dad jokes add/search/term?= + searchTerm have to validate this!!!
const baseURL = "https://icanhazdadjoke.com/";
const randomLaugh = document.getElementById("randomJoke");
const lotsOfLaughs = document.getElementById("jokeList");
const randBtn = document.querySelector("#randomButton");
const searchBtn = document.querySelector("#searchButton");
const yourJokes = document.querySelector("section");


randBtn.addEventListener("click", () => {


    async function getRandomJoke() {
        let response = await fetch(baseURL, {
            headers: {
                'Accept': 'application/json'
            }
        });
        let randJoke = await response.json();
        while (yourJokes.firstChild) {
            yourJokes.removeChild(yourJokes.firstChild);
        }
        let para = document.createElement("p");
        para.innerText = randJoke.joke;
        yourJokes.appendChild(para)
    }

    getRandomJoke();
})

searchBtn.addEventListener("click", () => {

    let term = document.querySelector("input").value;

    async function getJokeList() {
        let list = await fetch(`${baseURL}search?term=${term}`, {
            headers: {
                'Accept': 'application/json'
            }

        });
        let jokeList = await list.json();
        displayJokeList(jokeList);
    }
    getJokeList()
})

function displayJokeList(jokeList) {
    while (yourJokes.firstChild) {
        yourJokes.removeChild(yourJokes.firstChild);
    }
    if (jokeList.results.length === 0) {
        let userWord = document.querySelector("input").value;
        let para = document.createElement("p");
        para.innerText = `That's funny, we couldn't find any jokes for ${userWord}`;
        yourJokes.appendChild(para);
    } else {
        let jokeResult = jokeList.results;
        console.log(jokeResult);
        jokeResult.forEach(jo => {
            console.log(jo.joke);
            let para = document.createElement("p");
            para.innerText = jo.joke;
            yourJokes.appendChild(para);
        })
    }
}