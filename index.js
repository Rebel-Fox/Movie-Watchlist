let watchlistArray

if(localStorage.getItem("watchlistArray")){
    watchlistArray =JSON.parse(localStorage.getItem("watchlistArray"))
}else{
    watchlistArray=[]
}

const searchBtn = document.getElementById("search-btn")
const searchField = document.getElementById("search-field")
const resultGrid = document.getElementById("result-grid")

searchBtn.addEventListener("click", async () => {
    if (searchField.value) {
        const response = await fetch(`http://www.omdbapi.com/?apikey=57fec25c&s=${searchField.value}`)
        const data = await response.json()
        // console.log(data)
        const moviesList = data.Search
        console.log(moviesList)
        let resultGridHtml = ''
        for (const movie of moviesList) {
            const response = await fetch(`http://www.omdbapi.com/?apikey=57fec25c&i=${movie.imdbID}`)
            const data = await response.json()
            console.log(data)
            resultGridHtml += `
            <div class='movie-item' id='${data.imdbID}'>
                <img src='${data.Poster}' alt='${data.Title}'s poster'/>
                <div class='movie-info'>
                    <div class="flex-tray-one">
                        <h2 class='movie-title'>${data.Title}</h2>
                        <p class='movie-rating'><i class="fa-solid fa-star"></i>${data.imdbRating}</p>
                    </div>
                    <div class='flex-tray-two'>
                        <p class='movie-runtime'>${data.Runtime}</p>
                        <p class='movie-genre'>${data.Genre}</p>
                        <p class='add-to-watchlist' data-imdb-id='${data.imdbID}'><i class="fa-solid fa-circle-plus "></i>Watchlist</p>
                    </div>
                    <p class='movie-plot'>${data.Plot}</p>
                </div>
            </div>`
        }
        resultGrid.innerHTML = resultGridHtml
    }
})

document.addEventListener("click", e => {
    if (e.target.dataset.imdbId) {
        console.log(e.target.dataset.imdbId)
        console.log(typeof e.target.dataset.imdbId)
        watchlistArray.push(e.target.dataset.imdbId)
        updateLocalStorage()
        console.log(watchlistArray)
        // renderWatchlist()
    }
})

function updateLocalStorage(){
    localStorage.clear()
    localStorage.setItem("watchlistArray",JSON.stringify(watchlistArray))
    console.log("local storage updated")
}

