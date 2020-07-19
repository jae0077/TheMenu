$(document).ready(function() {
    if (!document.cookie){
	console.log("빔")
	document.getElementById("login").style.display = 'block';
	document.getElementById("signup").style.display = 'block';
	document.getElementById("state").style.display = 'none';
	document.getElementById("logout").style.display = 'none';

    }else {
        document.getElementById("login").style.display = 'none';
	document.getElementById("signup").style.display = 'none';
	document.getElementById("state").style.display = 'block';
	document.getElementById("state").textContent = document.cookie.split(";")[0].split("=")[1] + "님";
	document.getElementById("logout").style.display = 'block';
	console.log("있음")}
});
