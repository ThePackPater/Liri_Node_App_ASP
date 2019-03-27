// var inquirer = require("inquirer");

// inquirer
//     .prompt([

//         {
//             type: "list",
//             message: "What would you like to look up?",
//             choices: ["Movie", "Band", "Song"],
//             name: "userChoice"
//         },

//         {
//             type: "input",
//             message: "What's the name?",
//             name: "choiceName"
//         },



//     ])


// .then(function(inquirerResponse) {


//     if (inquirerResponse.userChoice === "band");

//     switch (whatchaNeed) {

//         case bandName:
//             inquirerResponse.userChoice === "band"
//             break;
//         case songName:
//             inquirerResponse.userChoice === "song"
//             break;
//         case movieName:
//             inquirerResponse.userChoice === "movie"
//         default:


//             console.log("\nOk I'll research the " + inquirerResponse.userChoice + inquirerResponse.choiceName);
//             console.log("One moment please!\n");


//     }




var axios = require("axios");

var nodeA = process.argv[2];

var nodeB = process.argv[3]

var movieName = "";

for (var i = 2; i < nodeA.length; i++) {

    if (i > 2 && i < nodeA.length) {
        movieName = movieName + "+" + nodeA[i];
    } else {
        movieName += nodeA[i];

    }
}

var queryUrlM = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

console.log(queryUrlM);

axios.get(queryUrlM).then(
    function(response) {
        console.log("Your Movie info: " + response.data.Year, response.data.Plot);
    }
);

var bandName = "";

for (var i = 2; i < nodeB.length; i++) {

    if (i > 2 && i < nodeB.length) {
        bandName = bandName + "+" + nodeB[i];
    } else {
        bandName += nodeB[i];
    }
}

var queryURLB = "https://rest.bandsintown.com/artists/" + bandName + "?app_id=codingbootcamp";

console.log(queryURLB);


axios.get(queryURLB).then(
    function(response) {
        console.log("Your band info: " + response);
    }
);