class Song {
    constructor(arr) {
        this.id = arr[0];
        this.artist = arr[1];
        this.song = arr[2];
        this.album = arr[3];
        this.genre = arr[4];
        this.time = arr[5];
        this.rating = arr[6];
        this.coverImage = arr[7];
        this.favorite = false;
        this.download = false;
    }

    setAsFavorite() {
        this.favorite = true;
    }

    removeFavorite() {
        this.favorite = false;
    }

    startDownload() {
        this.download = true;
    }
}

let musicData=[];

function init() {
    let songListArray = [
        [1, "Justin Bieber", "Holy", "Holy", "Pop", "3:26", "3", "holy.png"],
        [2, "BLACKPINK, Selena Gomez", "Ice Cream", "The Album", "Pop", "2:56", "1", "ice_cream.jpg"],
        [3, "Chelsea Collins", "Used to be (L.O.V.E.)", "Used to be (L.O.V.E.)", "Pop", "2:14", "4.5", "used_to_be_love.jpg"],
        [4, "Ava Max", "Kings & Queens", "Heaven & Hell", "Pop", "2:42", "3.5", "kings_and_queens.png"],
        [5, "Ananya Birla", "Let there be love", "Let there be love", "Pop", "3:10", "2", "let_there_be_love.jpg"],
        [6, "David Guetta, Sia", "Let's Love", "Let's Love", "Pop", "3:23", "5", "let's_love.jpg"],
        [7, "HRVY, Matoma", "Good Vibes", "Good Vibes", "Pop", "3:08", "2", "good_vibes.jpg"],  
        [8, "Sam Smith", "Diamonds", "Love Goes", "Pop", "3:32", "3", "diamonds.jpg"],
        [9, "Common", "I Used to Love H.E.R.", "Resurrection", "Hip-hop", "4:44", "2", "i_used_to_love_her.jpg"],
        [10, "Sugarhill Gang", "Rapper’s Delight" , "Sugarhill Gang" , "Hip-hop", "7:09", "5", "rappers_delight.jpg"],
        [11, "The Notorious B.I.G", "Respect", "Ready to Die", "Hip-hop", "5:20", "5", "respect.jpg"],
        [12, "Eminem", "Without Me", "The Eminem Show", "Hip-hop", "4:57", "4", "without_me.png"],
        [13, "Kane Brown", "Heaven", "Kane Brown", "Country", "2:55", "2.5", "heaven.jpg"],
        [14, "Russel Dickerson", "Yours", "YOurs", "Country", "3:37", "3", "yours.jpg"],
        [15, "Mason Ramsey", "Famous", "Famous", "Country", "3:15", "4.5", "famous.png"],
        [16, "Chase Rice", "Eyes On You", "Lambs & Lions", "Country", "3:02", "1", "eyes_on_you.jpg"]
    ]    
    musicData = songListArray.map(song => new Song(song))
    console.log('Init called - music data created');
}

function getMusicData() {
    console.log(`Music data list has a length: ${musicData.length}`);
    return musicData
}

function filterMusic(filter) {
    let filterStr = `with artist: ${filter.artist}, title: ${filter.song}, album: ${filter.album}, genre: ${filter.genre}`
    let searchedSongs = musicData.filter(song => {
        for(let key in filter) {
            if(song[key].toLowerCase() !== filter[key].toLowerCase() && filter[key] !== ""){
                return false
            }
        }
        return true
    });
    console.log(`filtered ${searchedSongs.length} songs..${filterStr}  `)
    return searchedSongs
}

function addFavorite(queryId) { 
    const id = parseInt(queryId);
    let [ favoriteSong ] = musicData.filter(song => {
        if(song.id === id) {
            song.setAsFavorite();
            return true;
        }
    });
    console.log(`Add favorite song - id: ${favoriteSong.id}, artist: ${favoriteSong.artist}, title: ${favoriteSong.song}`);
    return favoriteSong;
}

function downloadSong(paramsId) {
    const id = parseInt(paramsId);
    let [ downloadSong ] = musicData.filter(song => {
        if(song.id === id) {
            song.startDownload();
            return true;
        }
    });
    console.log(`Download song - id: ${downloadSong.id}, artist: ${downloadSong.artist}, title: ${downloadSong.song}`);
    return downloadSong;
}

module.exports = {
    init,
    getMusicData,
    filterMusic,
    addFavorite,
    downloadSong
}