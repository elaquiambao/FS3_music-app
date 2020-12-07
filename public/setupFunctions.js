let latestData = [];

async function insertSongList(songList, htmlSongSection, htmlFavoriteSection) {
    latestData = songList;
    resetSection(htmlSongSection);
    songList.forEach(song => {
        let tr = document.createElement("tr");
        let row_data = `<td>${song.artist}</td>
        <td>${song.song}</td>
        <td>${song.time}</td>
        <td>${song.album}</td>
        <td>${song.rating}</td>
        <td>${song.genre}</td>
        <td><button>Favorite</button></td>
        <td><button>Download</button></td>`
        tr.innerHTML = row_data
        tr.children[6].addEventListener("click", async () => {
            await addSongToFavoriteList(song, htmlSongSection, htmlFavoriteSection)
        })
        tr.children[7].addEventListener("click", () => {
            downloadSong(song.id);
            downloadSongSocket(song.id);
            alert(`Download starting - ${song.song}`)
        })
        htmlSongSection.appendChild(tr)
    })
}

function resetFields() {
    let fieldsArr = [searchArtist, searchSong, searchAlbum, searchGenre]
    fieldsArr.forEach(field => field.value = '');
}

function resetSection(htmlSection) {
    while(htmlSection.hasChildNodes()) {
        htmlSection.removeChild(htmlSection.lastChild);
    }
}

async function addSongToFavoriteList(song, htmlSongSection, htmlFavoriteSection) {
    if(song.favorite !== true) {
        let div = document.createElement("div")
        div.className = "trendingBox"
        let img = document.createElement("img")
        img.setAttribute("src", './images/' + song.coverImage)
        div.appendChild(img)
        const favSong = await addFavorite(song.id);

        div.addEventListener("click", () => {
            // div.remove()
            // song.removeFavorite()
        })
        htmlFavoriteSection.appendChild(div)
        updateLatestData(favSong);
        await insertSongList(latestData, htmlSongSection, htmlFavoriteSection);
    }
}

async function addFavorite(id) {
    const url = `http://localhost:8080/search/favorite?id=${id}`
    const response = await fetch(url);
    const favorite = await response.json();
    return favorite;
}

async function downloadSong(id) {
    const url = `http://localhost:8080/download`
    const reponse = await fetch(url, { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({id}) 
    })
}

function downloadSongSocket(songId) {
    socket.emit('download', songId);
}

function fieldsAreEmpty(artist, song, album, genre) {
    return artist + song + album + genre === "";
}

function updateLatestData(favSong) {
    latestData.forEach(song => {
        if (song.id === favSong.id) {
            song.favorite = true;
        }
    });
}