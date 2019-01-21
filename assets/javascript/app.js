
$(document).ready(function () {

    config = {
        apiKey: "AIzaSyDA4_DViTzR88DezkkwhZfvPKMpEKmv0gs",
        authDomain: "train-schedule-b9b03.firebaseio.com",
        databaseURL: "https://train-schedule-b9b03.firebaseio.com",
        storageBucket: "train-schedule-b9b03.appspot.com",
        projectId: "train-schedule-b9b03",
        messagingSenderID: "506033112850"
    };

    firebase.initializeApp(config);

    database = firebase.database();

    $("#submit-button").on("click", function () {

        var nameInput = $("#trainName").val().trim();

        console.log(nameInput);

         var destInput = $("#destination").val().trim();

        var timeInput = $("#trainTime").val().trim();

        var timeInputConver = moment(timeInput, "hh:mm").subtract(1, "years");

        var freqInput = $("#frequencey").val().trim();

        var currentTime = moment();

        var diffTime = moment().diff(moment(timeInputConver), "minutes");

        var timeremainder = diffTime % freqInput;

        var minLeft = freqInput - timeremainder;

        var nextArrival = moment().add(minLeft, "minutes");

        var nextArrivalConver = moment(nextArrival).format("hh:mm A");

        console.log("Minutes until next train arrives: " + minLeft);

        console.log("Next Train Arrives At " + moment(nextArrival).format("hh:mm A"));



        database.ref().push({
            name: nameInput,
            destination: destInput,
            trainTime: timeInput,
            frequencey: freqInput,
            minutesLeft: minLeft,
            nextArrival: nextArrivalConver
    });

    
  

        $("#trainName").val("");
        $("#destination").val("");
        $("#trainTime").val("");
        $("#frequencey").val("");

        return false;

    });

    database.ref().on("child_added", function(childSnapshot){


        fireTrain = childSnapshot.val().name;
        fireDest = childSnapshot.val().destination;
        fireTime = childSnapshot.val().trainTime;
        fireFreq = childSnapshot.val().frequencey;
        fireMin = childSnapshot.val().minutesLeft;
        fireArrival = childSnapshot.val().nextArrival;




        $("#addedTrains").append("<div class='row'><div class='col-md-3'>" + fireTrain + "</div><div class='col-md-3'>"+ fireDest + "</div><div class='col-md-2>" + fireFreq + " (min)" + "</div><div class='col-md-2>" + fireArrival + "</div><div class='col-md-2>" + fireMin + "</div></div>");

    });
});

