require("dotenv").config();
var inquirer = require("inquirer");
var axios = require("axios");
var keys = require("./key.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var divider = "\n------------------------------------------------------------\n\n";

inquirer
    .prompt([

        {
            type: "list",
            message: "What would you like to look up?",
            choices: ["MovieThis", "ConcertThisBand", "SpotifyThisSong", "DoWhatItSays"],
            name: "userChoice"
        },

        {
            type: "input",
            message: "What's the name?",
            name: "choiceName"
        },

    ])

.then(function(inquirerResponse) {

    console.log("\nResearching for: " + inquirerResponse.userChoice + ": " + inquirerResponse.choiceName);
    console.log("One moment please!\n");

    switch (inquirerResponse.userChoice) {
        case "ConcertThisBand":
            pickBand();
            break;
        case "MovieThis":
            pickMovie();
            break;
        case "SpotifyThisSong":
            pickSong();
            break;
        case "DoWhatItSays":
            iwantItthatWAY();
            break;

    }

    function pickMovie() {

        var movieName = inquirerResponse.choiceName;
        //console.log(movieName);

        if (!movieName) {
            console.log("\nNo Movie Specified... enjoy Meet the Spartans the #3 worst movie of 2008" +
                "\nYour Movie: Meet the Spartans" + "\nRated: PG-13" + "\nDate released: 2008" + "\nIMDB Rating: 2.7" +
                "\nCast: Sean Maguire, Carmen Electra, Ken Davitian, Kevin Sorbo" + "\nMovie plot: A spoof of 300 (2006) and many other movies, TV series/shows/commercials, video games and celebrities. King Leonidas of Sparta and his army of 12 go to war against Xerxes of Persia to fight to the death for Sparta's freedom." +
                "\nWebsite: http://www.meetthespartans.com" + divider);

        } else {

            var queryUrlM = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

            axios.get(queryUrlM).then(function(response) {

                console.log("Today's Date: " + response.headers.date);
                console.log("Your Movie: " + response.data.Title + "\nRated: " + response.data.Rated +
                    "\nDate released: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating +
                    "\nCast: " + response.data.Actors + "\nMovie plot: " + response.data.Plot + "\nWebsite: " +
                    response.data.Website + divider);

                fs.appendFile("log.txt", "Date: " + response.headers.date + "\n" + "Your Movie: " +
                    response.data.Title + "\nRated: " + response.data.Rated + "\nDate released: " +
                    response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nCast: " +
                    response.data.Actors + "\nMovie plot: " + response.data.Plot + "\nWebsite: " +
                    response.data.Website + divider,
                    function(err) {
                        if (err) throw err;
                    })

            })

        }

    }

    function pickBand() {
        var bandName = inquirerResponse.choiceName;

        if (!bandName) {

            console.log("your indecision has brought shame on you!" + "\nYour Band/Artist: Justin Bieber" + "\nFans tracking this artist: 3985942" + "\nUpcoming events: 0" +
                "\nCtrl +  left click on the link to see tour dates: https://www.bandsintown.com/a/307871?came_from=267&app_id=codingbootcamp" + divider);
        } else {

            var queryURLB = "https://rest.bandsintown.com/artists/" + bandName + "?app_id=codingbootcamp";

            axios.get(queryURLB).then(
                function(response) {

                    console.log("Today's Date: " + response.headers.date);
                    console.log("Your Band/Artist: " + response.data.name + "\n" + "Fans tracking this artist: " +
                        response.data.tracker_count + "\n" + "Upcoming events: " + response.data.upcoming_event_count +
                        "\n" + "Ctrl +  left click on the link to see tour dates: " + response.data.url + divider);

                    fs.appendFile("log.txt", "Date: " + response.headers.date + "\n" + "Your Band/Artist: " +
                        response.data.name + "\n" + "Fans tracking this artist: " + response.data.tracker_count +
                        "\n" + "Upcoming events: " + response.data.upcoming_event_count +
                        "\n" + "Ctrl +  left click on the link to see tour dates: " + response.data.url +
                        divider,
                        function(err) {
                            if (err) throw err;
                        })
                })

        }
    }

    function pickSong() {

        var songName = inquirerResponse.choiceName;

        if (!songName) {
            console.log("\nNo song specified... enjoy some Justin Bieber... " + "\nArtist: Justin Bieber" +
                "\nSong: Baby" + "\nAlbum : My World 2.0" + "\nPreview URL : it's so bad we can't add a preview!");
        } else {

            spotify.search({ type: 'track', query: songName }, function(err, data) {

                if (err) { return console.log('Error occurred: ' + err); }

                console.log("\nArtist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " +
                    data.tracks.items[0].name + "\nAlbum : " + data.tracks.items[0].album.name +
                    "\nPreview URL : " + data.tracks.items[0].preview_url + divider);

                fs.appendFile("log.txt", "Artist: " + data.tracks.items[0].album.artists[0].name + "\nSong: " +
                    data.tracks.items[0].name + "\nAlbum : " + data.tracks.items[0].album.name +
                    "\nPreview URL : " + data.tracks.items[0].preview_url + divider,
                    function(err) {
                        if (err) throw err;
                    })
            })

        }

    }

    function iwantItthatWAY() {

        console.log("Don't give me this kind of power! Your favorite song is now!\n");
        console.log("Artist: Backstreet Boys" + "\nSong: I Want It That Way " + "\nAlbum : The Hits--Chapter One " +
            "\nPreview URL : https://p.scdn.co/mp3-preview/e72a05dc3f69c891e3390c3ceaa77fad02f6b5f6?cid=b425ada3229145aaa5c20b19aa5c541a");

    }
});