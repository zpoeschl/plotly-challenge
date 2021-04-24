// --------------------------------------------------------------------------
// ---code from office hours with Dom:
// --      -generate bar graph
// --      -dropdown event handler
// --      -InitDashboard function
// ---my code:
// --      -generate bubble chart
// --      -generate metadata/demographic info
// --------------------------------------------------------------------------

// check that file is loading
console.log("app.js loaded");

// generate bar graph
function DrawBargraph(sampleId) {
    console.log(`DrawBargraph(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        // console.log(data);

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
            margin: { t: 30, l: 150 }
        }

        Plotly.newPlot("bar", barArray, barLayout);

    });
}

// generate bubble chart
function DrawBubblechart(sampleId) {
    console.log(`DrawBubblechart(${sampleId})`);

    d3.json("data/samples.json").then(data => {
        // console.log(data);

        var samples = data.samples;
        var resultArray = samples.filter(s => s.id == sampleId);
        var result = resultArray[0];

        var otu_ids = result.otu_ids;
        var otu_labels = result.otu_labels;
        var sample_values = result.sample_values;

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            type: "scatter"
        };

        var bubbleArray = [bubbleData];

        var bubbleLayout = {
            title: "Bacteria Cultures Found by Sample Size",
            showlegend: false,
            text: otu_labels
        };

        Plotly.newPlot("bubble", bubbleArray, bubbleLayout);
    });
}

// generate demographic info
function ShowMetadata(sampleId) {
    console.log(`ShowMetadata(${sampleId})`);

    d3.json("data/samples.json").then(data => {

        var metadata = data.metadata;
        var resultArray = metadata.filter(m => m.id == sampleId);
        var result = resultArray[0];

        var id = result.id;
        var ethnicity = result.ethnicity;
        var gender = result.gender;
        var age = result.age;
        var location = result.location;
        var bbtype = result.bbtype;
        var wfreq = result.wfreq;

        //d3.select(".panel-body").text(id);

        var demoData = {
            type: "table",
            header: {
                values: [["<b>ID</b>"], ["<b>ETHNICITY</b>"], ["<b>GENDER</b>"], ["<b>AGE</b>"], ["<b>LOCATION</b>"], ["<b>BBTYPE</b>"], ["<b>WFREQ</b>"]],
                align: ["left", "center"]
            },
            cells: {
                values: id, ethnicity, gender, age, location, bbtype, wfreq,
                align: ["left", "center"]
            }
        };

        Plotly.newPlot("sample-metadata", demoData);

        // pull demographic metadata
        // var id = metadata.forEach(meta => (`id: ${meta.id}`));
        // var ethnicity = metadata.forEach(meta => (`ethnicity: ${meta.ethnicity}`));
        // var gender = metadata.forEach(meta => (`gender: ${meta.gender}`));
        // var age = metadata.forEach(meta => (`age: ${meta.age}`));
        // var location = metadata.forEach(meta => (`location: ${meta.location}`));
        // var bbtype = metadata.forEach(meta => (`bbtype: ${meta.bbtype}`));
        // var wfreq = metadata.forEach(meta => (`wfreq: ${meta.wfreq}`));

        // attach to `result`, test print to console
        // console.log("id: ", result.id);
        // console.log("ethnicity: ", result.ethnicity);
        // console.log("gender: ", result.gender);
        // console.log("age: ", result.age);
        // console.log("location: ", result.location);
        // console.log("bbtype: ", result.bbtype);
        // console.log("wfreq: ", result.wfreq);

        // push demographic metadata to html, <div id="sample-metadata" class="panel-body"></div>
        // d3.select(".panel-body").text(`id: ${result.id}`);
        
    });
}

// create event handler for dropdown
function optionChanged(newSampleId) {
    console.log(`User selected ${newSampleId}`);

    // update charts based on new selected item from dropdown
    DrawBargraph(newSampleId);
    DrawBubblechart(newSampleId);
    // ShowMetadata(newSampleId);
}

// create InitDashboard function
function InitDashboard() {
    // console.log("InitDashboard()");

    // populate dropdown
    var selector = d3.select("#selDataset");
    // pull data from samples.json and print to console
    d3.json("data/samples.json").then(data => {
        // console.log(data);

        // populate dropdown using samples.json
        var sampleNames = data.names;

        sampleNames.forEach(sampleId => {
            selector.append("option").text(sampleId).property("value", sampleId);
        });

        var id = sampleNames[0];

        DrawBargraph(id);
        DrawBubblechart(id);
        ShowMetadata(id);
    }); 
}

// call the function
InitDashboard();