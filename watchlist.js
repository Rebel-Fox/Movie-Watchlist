let watchlistArray = JSON.parse(localStorage.getItem("watchlistArray"))
function pageView(){
    if (localStorage.getItem("watchlistArray")) {
    
        console.log(watchlistArray)
        const resultWatchlistGrid = document.getElementById("result-watchlist-grid")
        
        async function renderWatchlist() {
            let html = ''
            for(let movie of watchlistArray){
                const response = await fetch(`http://www.omdbapi.com/?apikey=57fec25c&i=${movie}`)
                const data = await response.json()
                    html += `
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
                                <p class='remove-from-watchlist' data-imdb-id='${data.imdbID}'><i class="fa-solid fa-circle-minus "></i>Watchlist</p>
                            </div>
                            <p class='movie-plot'>${data.Plot}</p>
                        </div>
                    </div>`
                
            }

            if(!watchlistArray.length){
                html = `<p class="empty-watchlist-text">Your watchlist is looking a little empty</p>
                        <a href="index.html">
                        <p class="empty-watchlist"><i class="fa-solid fa-circle-plus"></i>Let's add some movies</p>
                        </a>`
            }
            resultWatchlistGrid.innerHTML = html
        }
        renderWatchlist()
    }
}

pageView()


document.addEventListener("click",e=>{
    if(e.target.dataset.imdbId){
        console.log(e.target.dataset.imdbId)
        const indexToRemove =watchlistArray.indexOf(e.target.dataset.imdbId)
        watchlistArray.splice(indexToRemove,1)
        updateLocalStorage()
    }
})

function updateLocalStorage(){
    localStorage.clear()
    localStorage.setItem("watchlistArray",JSON.stringify(watchlistArray))
    pageView()
    console.log("local storage updated")
}