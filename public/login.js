var firebaseConfig = {
    apiKey: "AIzaSyAD0Y04NLAtEukphcSJ1s6T8Ffp_AWx-ew",
    authDomain: "galbi-3ce0c.firebaseapp.com",
    databaseURL: "https://galbi-3ce0c.firebaseio.com",
    projectId: "galbi-3ce0c",
    storageBucket: "galbi-3ce0c.appspot.com",
    messagingSenderId: "287266351759",
    appId: "1:287266351759:web:3bdf04f7e5202420549efa"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get a reference to the database service
var database = firebase.database();

var UserRef = database.ref("/Users");

$(document).ready(function () {
    window.login = function () {
        var User_id = document.getElementById("username").value;
        var User_pw = document.getElementById("pw").value;

        var LoginRef = UserRef.child(User_id);
        sessionStorage.setItem("id", User_id);
        var email = sessionStorage.getItem("id");

        var Userlist = UserRef.on("value", function(snapshot) {
            var str_snapshot = JSON.stringify(snapshot);
            var IDs = Object.keys(snapshot.val());

            //console.log("temp_arr : " + temp_arr);
            if(IDs.includes(User_id)){
                console.log("Yes! we have " + User_id);
            }
            else{
                console.log("No! we don't have " + User_id);
                var LoginRef = UserRef.child(User_id);
                loginRef.set({
                    Cuisine: cuisine,
                    Restaurant: restaurant,
                    Time: time
                });
            }

            window.location.href = "friends.html";
        });

    }
});
