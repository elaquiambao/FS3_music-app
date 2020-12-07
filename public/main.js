const searchArtist = document.querySelector("#searchArtist"),
    searchSong = document.querySelector("#searchSong"),
    searchAlbum = document.querySelector("#searchAlbum"),
    searchGenre = document.querySelector("#searchGenre"),
    searchButton = document.querySelector("#searchButton"),
    resetButton = document.querySelector("#resetButton"),
    favoriteSongSection = document.querySelector('#trendingContent'),
    searchedSongSection = document.querySelector("#songList tbody");

searchButton.addEventListener("click", e => {
    e.preventDefault()

    const artist = searchArtist.value;
    const song = searchSong.value;
    const album = searchAlbum.value;
    const genre = searchGenre.value;

    if(fieldsAreEmpty(artist, song, album, genre)) {
        alert('Please complete atleast one field!');
    } else {
        (async () => {
            const url = `http://localhost:8080/search/filterMusic?artist=${artist}&song=${song}&album=${album}&genre=${genre}`;
            const response = await fetch(url);
            const musicData = await response.json();
            await insertSongList(musicData, searchedSongSection, favoriteSongSection);
        })();
    }
});

resetButton.addEventListener("click", e => {
    e.preventDefault()
    resetFields()
});





