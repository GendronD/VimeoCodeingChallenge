var iframe = document.querySelector('iframe');
var player = new Vimeo.Player(iframe);
var cueArray = [];
var played = 0;

player.getVideoTitle().then(function (title) {
    console.log('title:', title);
});

player.on('play', function (data) {
    console.log('played the video!');
    console.log(data);
});

// Cue Object Creator
function cueCreator(cue, time) {
    this.cue = cue;
    this.time = time;
    this.id = time * Math.random() + 1;
}

// Add Cues
function addCue() {

    // Retrieve form elements
    var cue = document.getElementById("cue").value;
    var time = document.getElementById("time").value;

    // Test that they were retrieved
    console.log(cue);
    console.log(time);

    // Create cue object
    var cueObj = new cueCreator(cue, time);

    // Push object to array
    cueArray.push(cueObj);

    // Log Array
    console.log(cueArray);
    var buildRow = cueArray.length - 1;

    // Add Cue to table
    buildCueTable(cueArray[buildRow]);

    // Empty form so new cues can be entered
    emptyForm();
};

// Run within video timestamps
player.on('timeupdate', function(data) {
    console.log(data);
    document.getElementById("cue_text").innerHTML = "";
    document.getElementById("cue_time").innerHTML = "";

    // loop through cues
    for (var i = 0; i < cueArray.length; i++) {
        var timecue = parseFloat(cueArray[i].time);
        var textcue = cueArray[i].cue;

        // If video is within cue range
        if (timecue <= data.seconds && timecue + 5 >= data.seconds) { 
            // show cue on video player
            console.log(parseFloat(cueArray[i].time));
            console.log(data.seconds);
            displayCues(textcue, timecue);
            // break to prevent display not showing
            break;
        }
        else {
            document.getElementById("display-overlay").style.display = "none";
            document.getElementById("cue_text").innerHTML = "";
        }
    }
}); 

// Displays Cue Message in Overlay on embedded video
function displayCues(textcue, timecue) {
    document.getElementById("display-overlay").style.display= "block";
    document.getElementById("cue_text").innerHTML = textcue;
}

// Delete from array
function popFromCueArray(id) {
    for(var i = 0; i < cueArray.length; i++) {
        if(cueArray[i].id === id) {
            console.log(cueArray[i]);
            cueArray.splice(i, 1);
            console.log(cueArray);
        }
    }
}

// Cue Table - New row is built with each addition to cueArray
function buildCueTable(cueArray) {
    // Create new row
    var tbl = document.getElementById("cueTable");
    var row = tbl.insertRow(-1);
    var id = cueArray.id;
    
    // Set row id to cue id
    row.setAttribute("id", cueArray.id);

    // set variable for text content of td
    var cue_text = cueArray.cue;
    var cue_time = cueArray.time;

    // Fill td's and append to row
    var cueCell = document.createElement("td");
    cueCell.textContent = cue_text;
    row.appendChild(cueCell);
    var timeCell = document.createElement("td");
    timeCell.textContent = cue_time;
    row.appendChild(timeCell);

    // Create delete cell and delete button
    var deleteCell = document.createElement("td");
    var dbtn = document.createElement("button");
    dbtn.textContent = "Delete";
    dbtn.setAttribute('id', 'delete');
    dbtn.setAttribute('onclick', 'deleteRow(' + id + ')');
    deleteCell.appendChild(dbtn);
    row.appendChild(deleteCell);

    // Append new row to table
    tbl.appendChild(row);
}

// Delete Row
function deleteRow(id) {

    console.log("delete id:" + id);
    // Get row using cue object id
    var row = document.getElementById(id);
    // Delete from table
    row.parentNode.removeChild(row);

    // Also delete from cueArray
    popFromCueArray(id);

    console.log("Deleting Row");
    event.preventDefault();
}

// Removes Text From Cue Entry Form
function emptyForm() {
    document.getElementById("cue").value = "";
    document.getElementById("time").value = "";
}








