// ---- WORK BREAKDOWN STRUCTURE ----
// import the data
// populate the dropdown menu
// generate initial charts based on first item in dropdown (bar graph, bubble chart, demographic panel)
// draw a bar graph - function
// draw a bubble chart - function
// show demographic information panel - function
// respond to change events on dropdown

// ** LABEL ANY CODE AS "FROM OFFICE HOURS WITH DOM" **

// check that file is loading
console.log("app.js loaded");

// create initial function
function InitDashboard() {
    console.log("InitDashboard()");

    // populate dropdown
    var selector = d3.select("#selDataset");
        // pull data from samples.json and print to console
    d3.json("data/samples.json").then(function(data) {
        console.log(data);
    });

    // update bargraph

    // update bubble chart

    // update demograph info

}

// call the function
InitDashboard();