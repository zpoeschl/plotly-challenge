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

// stubs for generating initial charts
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        //console.log(resultArray);
        var result = resultArray[0];
        //console.log(result);

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        yticks = otu_ids.slice(0, 10).map(otuId => `OTU ${otuId}`).reverse();

        var barData = {
            x: sample_values.slice(0, 10).reverse(),
            y: yticks,
            type: "bar",
            text: otu_labels.slice(0, 10).reverse(),
            orientation: "h"
        }

        var barArray = [barData];

        var barLayout = {
            title: "Top 10 Bacteria Cultures Found",
            margin: {t: 30, l: 150}
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });
}

function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);
}

function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);
}

// create event handler for dropdown
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    // update charts based on new selected item from dropdown
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    ShowMetadata(newSampleId);
}

// create initial function
function InitDashboard() {
    console.log("InitDashboard()");

    // populate dropdown
    var selector = d3.select("#selDataset");
        // pull data from samples.json and print to console
    d3.json("data/samples.json").then(data => {
        console.log(data);

        // populate dropdown using samples.json
        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option").text(sampleId).property("value", sampleId);
        });

        // create a stub working with first item in dropdown ("[0]")
        var id = sampleNames[0];

        DrawBargraph(id);
        DrawBubblechart(id);
        ShowMetadata(id);
    });

    // update bargraph

    // update bubble chart

    // update demograph info

}

// call the function
InitDashboard();