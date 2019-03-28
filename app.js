var inquirer = require("inquirer");
var axios = require("axios");
//var Spotify = require('node-spotify-api');


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
            // case "SpotifyThisSong":
            //     pickSong();
            //     break;
            //  case:" DoWhatItSays"
            //     iwantItthatWAY();
            // default:
            //     console.log("\nI don't recognize your request. Please try again.\n")
    }

    function pickMovie() {

        var movieName = inquirerResponse.choiceName;
        //console.log(movieName);

        var queryUrlM = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

        //console.log(queryUrlM);

        axios.get(queryUrlM).then(
            function(response) {
                //console.log(response);
                console.log("Today's Date: " + response.headers.date);
                console.log("Your Movie: " + response.data.Title + "\nRated: " + response.data.Rated + "\nDate released: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbRating + "\nCast: " + response.data.Actors + "\nMovie plot: " + response.data.Plot + "\nWebsite: " + response.data.Website);
            })
    }

    function pickBand() {

        var bandName = inquirerResponse.choiceName;
        //console.log(bandName);

        var queryURLB = "https://rest.bandsintown.com/artists/" + bandName + "?app_id=codingbootcamp";

        axios.get(queryURLB).then(
            function(response) {
                //console.log(response);
                console.log("Today's Date: " + response.headers.date);
                console.log("Your Band/Artist: " + response.data.name + "\n" + "Fans tracking this artist: " + response.data.tracker_count + "\n" + "Upcoming events: " + response.data.upcoming_event_count + "\n" + "Ctrl +  left click on the link to see tour dates: " + response.data.url);
            })
    }

    // function pickSong() {

    //     var songName = inquirerResponse.choiceName;

    //     var spotify = new Spotify({
    //         id: < your spotify client id > ,
    //         secret: < your spotify client secret >
    //     });

    //     spotify.search({
    //         type: 'track',
    //         query: 'All the Small Things'
    //     }, function(err, data) {
    //         if (err) {
    //             return console.log('Error occurred: ' + err);
    //         }

    //         console.log(data);
    //     });
    // }

});