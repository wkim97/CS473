
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
var ChatroomNum = window.location.href.split("?")[1].split("=")[1];
var ChatroomMsg = database.ref('ChatroomMsg/Chatroom' + ChatroomNum);
var ChatroomaPart = database.ref('ChatroomPart/Chatroom' + ChatroomNum);
var chat_part_ref = database.ref("ChatroomPart/Chatroom" + ChatroomNum).on("child_added", function (snapshot) {
  var name = snapshot.key;
  var owner = snapshot.val();
  var nametag = document.getElementsByClassName("text-center")[0];
  if (owner == true) {
    nametag.innerHTML = name + nametag.innerHTML;
  }
  else {
    nametag.innerHTML = nametag.innerHTML + ', ' + name;
  }

});
var me = sessionStorage.getItem("id");
var chat_data_ref = ChatroomMsg.on('child_added', function (snapshot) {
  var str_snapshot = JSON.stringify(snapshot);
  // alert(str_snapshot);
  var temp = str_snapshot.split(',')
  var chat = temp[0].split(':')[1].replace(/['"{}]+/g, '');
  var time = temp[1].split(':')[1].replace(/['"{}]+/g, '');
  var user = temp[2].split(':')[1].replace(/['"{}]+/g, '');
  if (user == "Dummy") {
    console.log("dummy chat pass");
  }
  else if (user == me) {
    append_outgoing_msg(chat, time);
  }
  else {
    append_incoming_msg(user, chat, time);
  }
  var rootelem = document.getElementsByClassName("msg_history")[0];
  rootelem.scrollTop = rootelem.scrollHeight;
});
function goBack() {
  location.replace("chats.html");
}
function send_message() {
  //var message = document.getElementById("chat").value;
  var date = new Date();
  var year = date.getFullYear() + "";
  var month = (date.getMonth() + 1) + "";
  month = (month[1] ? month : '0' + month);
  var day = date.getDate() + "";
  day = (day[1] ? day : '0' + day);
  var hour = date.getHours() + "";
  hour = (hour[1] ? hour : '0' + hour);
  var minute = date.getMinutes() + "";
  minute = (minute[1] ? minute : '0' + minute);
  var second = date.getSeconds() + "";
  second = (second[1] ? second : '0' + second);
  var ms = date.getMilliseconds() + "";
  var timeid = year + month + day + hour + minute + second + ms;
  var msg = document.getElementById("type_here").getAttribute("value");

  // console.log(typeof (msg));
  var usr = sessionStorage.getItem("id");
  database.ref().child('ChatroomMsg/Chatroom' + ChatroomNum + '/Chat' + timeid).set({
    User: usr,
    Content: msg,
    Time: year + '.' + month + '.' + day + '.' + hour + '.' + minute + '.' + second
  });
  document.getElementById("type_here").setAttribute("value", "");
}
function append_outgoing_msg(chat, time) {
  console.log(chat);
  var rootelem = document.getElementsByClassName("msg_history")[0];
  var outgoelem = document.createElement("div");
  outgoelem.setAttribute('class', 'outgoing_msg');
  var msgelem = document.createElement("div");
  msgelem.setAttribute('class', "sent_msg");
  var msg = document.createElement('p');
  msg.innerHTML = chat;
  var tim = document.createElement("span");
  tim.setAttribute('class', "time_date");
  tim.innerHTML = time;
  msgelem.appendChild(msg);
  msgelem.appendChild(tim);
  outgoelem.appendChild(msgelem);
  rootelem.appendChild(outgoelem);
}
function append_incoming_msg(user, chat, time) {
  console.log("append)incoming_msg : " + chat);
  var rootelem = document.getElementsByClassName("msg_history")[0];
  var incomeelem = document.createElement("div");
  incomeelem.setAttribute('class', 'incoming_msg');
  var imgelem = document.createElement("div");
  imgelem.setAttribute('class', 'incoming_msg_img');
  var img = document.createElement("img");
  img.setAttribute('src', "done.jpg");
  // img.setAttribute('alt', "sunil");
  var msgelem = document.createElement("div");
  msgelem.setAttribute('class', "received_msg");
  var name = document.createElement("span");
  name.innerHTML = user;
  name.style.fontWeight = 'bold';
  var msg = document.createElement('p');
  msg.innerHTML = chat;
  var tim = document.createElement("span");
  tim.setAttribute('class', "time_date");
  tim.innerHTML = time;
  imgelem.appendChild(img);
  msgelem.appendChild(name);
  msgelem.appendChild(msg);
  msgelem.appendChild(tim);
  incomeelem.appendChild(imgelem);
  incomeelem.appendChild(msgelem);
  rootelem.appendChild(incomeelem);
}
function type_pref(abc) {
  text = document.getElementById("type_here").getAttribute("value");
  if (["Good", "Bad", "Yes", "No", "?", "."].includes(abc)) {
    text = text + abc;
  }
  else {
    text = text + '/' + abc;
  }
  if (text[0] == '/') {
    text = text.slice(1);
  }
  document.getElementById("type_here").setAttribute("value", text);
}
function untype_pref() {
  var text = document.getElementById("type_here").getAttribute("value");
  var len = text.length;
  // alert(text.charAt(len-1));
  if (["Good", "Bad", "Yes", "No", "?", "."].includes(text.charAt(len - 1))) {
    text = text.substring(0, len - 1);
    // alert(text);
  }
  else {
    var lastidx = text.lastIndexOf('/');
    text = text.substring(0, lastidx);
  }
  document.getElementById("type_here").setAttribute("value", text);
}
function send_msg() {
  var rootelem = document.getElementsByClassName("msg_history")[0];
  var outgoelem = document.createElement("div");
  outgoelem.setAttribute('class', 'outgoing_msg');
  var msgelem = document.createElement("div");
  msgelem.setAttribute('class', "sent_msg");
  var msg = document.createElement('p');
  var text_msg = document.getElementById("type_here").getAttribute("value");
  msg.innerHTML = text_msg;
  var time = document.createElement("span");
  time.setAttribute('class', "time_date");
  time.innerHTML = "Time and date will be added!!!!!";
  msgelem.appendChild(msg);
  msgelem.appendChild(time);
  outgoelem.appendChild(msgelem);
  rootelem.appendChild(outgoelem);
  document.getElementById("type_here").setAttribute("value", "")
}
function set_time() {
  var time_val = document.getElementById("apt_time").value;
  // alert(time_val);

  time_val = time_val.replace(":", ";");
  console.log(time_val);
  type_pref(time_val);

  // document.getElementById("type_here").setAttribute("value", time_val);
}

var modal = document.getElementById("myModal");
var btn = document.getElementById("tgl");
var avail_ref = database.ref("ChatroomMeta/Chatroom" + ChatroomNum);
avail_ref.on('value', function(snapshot) {
    var str_snapshot = JSON.stringify(snapshot);
    var data = str_snapshot.split(',')[0];
    available = data.split(':')[1];
    console.log(available);
    if (available == "true") {
      btn.setAttribute('class', "ui toggle basic icon button active");
      console.log("Set active");
    }
    else {
      btn.setAttribute('class', "ui toggle basic icon button inactive");
      console.log("Set inactive");
    }
});
// var span = document.getElementsByClassName("close")[0];
var span = document.getElementById("close")
var done = document.getElementById("yes");
var notdone = document.getElementById("no");
btn.onclick = function () {
  modal.style.display = "block";
}
span.onclick = function () {
  modal.style.display = "none";
}
notdone.onclick = function () {
  modal.style.display = "none";
}
done.onclick = function () {
  btn.classList.add('inactive');
  database.ref("ChatroomMeta/Chatroom" + ChatroomNum + "/Availability").set(false);
  modal.style.display = "none";
}

$(document).ready(function () {
  $('ul.tabs li').click(function () {
    var tab_id = $(this).attr('data-tab');
    $('ul.tabs li').removeClass('current');
    $('.tab-content').removeClass('current');
    $(this).addClass('current');
    $("#" + tab_id).addClass('current');
  })
})
