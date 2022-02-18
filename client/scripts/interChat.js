/*
	name: 		InterChat
	author: 	UnitedCatdom
	versoin: 	1.0.0
	desc: 		Makes you able to copy chat text!
*/

document.addEventListener("DOMContentLoaded", (event) => {
	let css = document.createElement("style");
	css.innerHTML = "#chatList { user-select: text }";
	document.head.appendChild(css);
})