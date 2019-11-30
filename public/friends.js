// Your web app's Firebase configuration
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

var rootRef = database.ref();

var user = sessionStorage.getItem('id');
function save_preferences() {
    var cuisine = document.getElementById("cuisine").value;
    var restaurant = document.getElementById("restaurant").value;
    var time = document.getElementById("time").value;

     // Send message to firebase DB
     rootRef.child('Users').child(user).set({
        Cuisine: cuisine,
        Restaurant: restaurant,
        Time: time
    });
 };

 function trim(s) {
    return (s || '').replace(/^\s+|\s+$/ + /"/g, '');
};
