

var config = {
    apiKey: "AIzaSyBIDdh34E-xldZf7MOI5kjAfM0lSDg7BUM",
    authDomain: "trainschedule-6cfc5.firebaseapp.com",
    databaseURL: "https://trainschedule-6cfc5.firebaseio.com",
    projectId: "trainschedule-6cfc5",
    storageBucket: "trainschedule-6cfc5.appspot.com",
    messagingSenderId: "403412441792"
};
firebase.initializeApp(config);




var database = firebase.database();






$("#add-user").on("click", function (event) {

    event.preventDefault()

    var inputName = $("#name-input").val()

    var inputstartdate = $("#startdt-input").val()
    var inputRole = $("#role-input").val()
    var inputMonthly = $("#monthlyRate-input").val()
    var inputtMinutesTillTrain = $("#minutesAway").val()
    

    console.log(inputName)
    console.log(inputstartdate)
    console.log(inputRole)
    console.log(inputMonthly)
    console.log(inputtMinutesTillTrain)

    var tFrequency = 5;

    // Time is 3:30 AM
    var firstTime = "12:00";

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    
    



    var newEmp = {
        name: inputName,
        startDate: inputstartdate,
        role: inputRole,
        monthlyRate: inputMonthly,
        minutesAway: tMinutesTillTrain,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
}


    
    database.ref().push(newEmp)



    $("form")[0].reset();


})

database.ref().on("child_added", function (snapshot) {

    

    // Print the initial data to the console.
    console.log(snapshot.val());

    // Log the value of the various properties
    var dbName = (snapshot.val().name);
    var dbStarDate = (snapshot.val().startDate);
    var dbRole = (snapshot.val().role);
    var dbMonthlyRate = (snapshot.val().monthlyRate);
    var dbMinutesAway = (snapshot.val().minutesAway);

    var tRow = $("<tr>")

    var cellName = $("<td>").text(dbName)
    var cellDate = $("<td>").text(dbStarDate)
    var cellRole = $("<td>").text(dbMonthlyRate)
    var cellMRate = $("<td>").text(dbRole)
    var cellMAway = $("<td>").text(dbMinutesAway)


    tRow.append(cellName, cellDate, cellRole, cellMRate, cellMAway)

    $("#tableBody").append(tRow);




    // // Change the HTML
    // $("#displayed-data").text(snapshot.val().name + " | " + snapshot.val().age + " | " + snapshot.val().phone);

    // If any errors are experienced, log them to console.
}, function (errorObject) {
    console.log("The read failed: " + errorObject.code);
});

