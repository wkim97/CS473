function append_incomming_msg(){
	
	var rootelem = document.getElementsByClassName(“msg_history”);

	var incomeelem = document.createElement("div");
	incomeelem.setAttribute('class', 'incomming_msg');

	var imgelem = document.createElement("div");
	imgelem.setAttribute('class', 'incoming_msg_img');

	var img = document.createElement("img");
	img.setAttribute('src', "../images/chani.jpg");
	img.setAttribute('alt', "sunil");

	var msgelem = document.createElement("div");
	msgelem.setAttribute('class', "recieved_msg");

	var msg = document.createElement('p');
	msg.innerHTML = "here we are!!!!!!";

	var time = document.creatElemet("span");
	time.setAttribute('class', "time_date");
	time.innerHTML = "Time and date will be added!!!!!";


	imgelem.appendChild(img);
	msgelem.appendChild(msg);
	msgelem.appendChild(time);

	incomeelem.appendChild(imgelem);
	incomeelem.appendChild(msgelem);

}



function say_hi(){

	alert("hi!!!!!!!");
}