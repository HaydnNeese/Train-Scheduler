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
var trainName = '';
var destination = '';
var trainFirstTime = '00:00';
var frequency = 0;

//make a click handler to add user input to firebase
$('#submit').on('click', function () {
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

    // //insert into the train schedule table
    // var row = $('<tr>');
    // var nameCell = $('<td>');
    // var destCell = $('<td>');
    // var freqCell = $('<td>');
    // var timeCell = $('<td>');
    // // var nextCell = $('<td>');
    // nameCell.text(trainName);
    // destCell.text(destination);
    // freqCell.text(frequency);
    // timeCell.text(firstTimeConverted);
    // row.append(nameCell, destCell, freqCell, timeCell)
    // $('.train-schedule').append(row);