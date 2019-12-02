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

var name = sessionStorage.getItem("id");
// Get a reference to the database service
var database = firebase.database();

var rootRef = database.ref();

var user = sessionStorage.getItem('id');
function save_preferences() {
    var cuisine = document.getElementById("cuisine").value;
    var restaurant = document.getElementById("restaurant").value;
    var time = document.getElementById("time").value;

    if(cuisine == "-"){
        cuisine = "Null";
    }
    if(restaurant == "-"){
        restaurant = "Null";
    }
    if(time == ""){
        time = "Null";
    }

    // Send message to firebase DB
    rootRef.child('Users').child(user).set({
        Cuisine: cuisine,
        Restaurant: restaurant,
        Time: time
    });
};

var preference_ref = database.ref("Users/" + name);
preference_ref.on('value', function (snapshot) {
    var cuisine = document.getElementById("cuisine-text");
    var restaurant = document.getElementById("restaurant-text");
    var time = document.getElementById("time");

    var str_snapshot = JSON.stringify(snapshot);
    var temp = str_snapshot.split(",");

    var cuisine_text = temp[0].split(":")[1].replace(/['"{}]+/g, '');
    if (cuisine_text == "Null") {
        cuisine.innerHTML = "-";
        cuisine.value = "-";
    }
    else {
        cuisine.innerHTML = cuisine_text;
        cuisine.value = cuisine_text;
    }

    var restaurant_text = temp[1].split(":")[1].replace(/['"{}]+/g, '');
    if (restaurant_text == "Null") {
        restaurant.innerHTML = "-";
        restaurant.value = "-";
    }
    else {
        restaurant.innerHTML = restaurant_text;
        restaurant.value = restaurant_text;
    }

    var hour = temp[2].split(":")[1].replace(/['"{}]+/g, '');
    if (hour == "Null") {
        time.value = "--:--";
        time.innerHTML = "--:--";
    }
    else {
        var min = temp[2].split(":")[2].replace(/['"{}]+/g, '');
        var t = hour + ":" + min;
        time.innerHTML = t;
        time.value = t;
    }
});

function trim(s) {
    return (s || '').replace(/^\s+|\s+$/ + /"/g, '');
};
