var inquirer = require("inquirer");
var axios = require("axios");


inquirer
    .prompt([

        {
            type: "list",
            message: "What would you like to look up?",
            choices: ["Movie", "Band", "Song"],
            name: "userChoice"
        },

        {
            type: "input",
            message: "What's the name?",
            name: "choiceName"
        },

    ])

.then(function(inquirerResponse) {

    console.log("\nOk I'll research the " + inquirerResponse.userChoice + ": " + inquirerResponse.choiceName);
    console.log("One moment please!\n");

    switch (inquirerResponse.userChoice) {
        case "Band":
            //console.log("workingBand");
            pickBand();
            break;
        case "Movie":
            //console.log("workingMovie");
            pickMovie();
            break;
            // case "Song":
            //     var songName = inquirerResponse.choiceName;
            //     pickSong();
            //     break;
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
                console.log("Today's Date: " + response.headers.date);
                console.log("Your Movie: " + response.data.Title + "\nRated: " + response.data.Rated + "\nDate released: " + response.data.Year + "\nIMDB Rating: " + response.data.imdbrating + "\nMovie plot: " + response.data.Plot + "\nWebsite: " + response.data.Website);
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
                console.log("Your Band/Artist: " + response.data.name + "\n" + "Fans tracking this artist: " + response.data.tracker_count + "\n" + "Upcoming events: " + response.data.upcoming_event_count + "\n" + response.data.url);
            })
    }

});