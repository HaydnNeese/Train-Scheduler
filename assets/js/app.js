// Initialize Firebase
var config = {
    apiKey: "AIzaSyBodPPqQ7Nyttd7areo45C9iT-QreQdYJo",
    authDomain: "train-scheduler-bd92b.firebaseapp.com",
    databaseURL: "https://train-scheduler-bd92b.firebaseio.com",
    projectId: "train-scheduler-bd92b",
    storageBucket: "train-scheduler-bd92b.appspot.com",
    messagingSenderId: "1082322245220"
};
firebase.initializeApp(config);

//define variable database
var database = firebase.database();

//make some empty variables to store the retrieved user input 
var nameInput = '';
var desinationInput = '';
var firstTimeInput = '00:00';
var frequencyInput = 0;

//make a click handler to add user input to firebase
$(document).on('click', '#submit', function () {
    event.preventDefault();
    //retrieve values from input fields
    nameInput = $('#name-input').val().trim();
    destinationInput = $('#destination-input').val().trim();
    firstTimeInput = $('#time-input').val().trim();
    frequencyInput = $('#frequency-input').val().trim();
    //add to firebase
    database.ref().push({
        name: nameInput,
        destination: destinationInput,
        trainFirstTime: firstTimeInput,
        frequency: frequencyInput,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
    //clear input
    $('#name-input').val('');
    $('#destination-input').val('');
    $('#time-input').val('');
    $('#frequency-input').val('');
});

database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function (snapshot) {
    console.log(snapshot);
    //time calculations
    var tFrequency = snapshot.val().frequency;
    var firstTime = snapshot.val().trainFirstTime;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var currentTime = moment();
    var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);
    var tMinutesTillTrain = tFrequency - tRemainder;
    var nextTrain = currentTime.add(tMinutesTillTrain, "minutes");
    var minutesTil = nextTrain.diff(currentTime);
    console.log(minutesTil);
    console.log(tMinutesTillTrain);
    //create empty row with 5 cells
    var row = $('<tr>');
    var nameCell = $('<td>');
    var destCell = $('<td>');
    var freqCell = $('<td>');
    var nextCell = $('<td>');
    var timeCell = $('<td>');
    // assign text to the cells
    nameCell.text(snapshot.val().name);
    destCell.text(snapshot.val().destination);
    freqCell.text(snapshot.val().frequency);
    nextCell.text(moment(nextTrain).format("HH:mm"));
    timeCell.text(tMinutesTillTrain + " minutes");
    row.append(nameCell, destCell, freqCell, nextCell, timeCell);
    $('.train-schedule').append(row);
});

    // //insert into the train schedule table
    // var row = $('<tr>');
    // var nameCell = $('<td>');
    // var destCell = $('<td>');
    // var freqCell = $('<td>');
    // var timeCell = $('<td>');
    // var nextCell = $('<td>');
    // nameCell.text(trainName);
    // destCell.text(destination);
    // freqCell.text(frequency);
    // timeCell.text(firstTimeConverted);
    // row.append(nameCell, destCell, freqCell, timeCell)
    // $('.train-schedule').append(row);