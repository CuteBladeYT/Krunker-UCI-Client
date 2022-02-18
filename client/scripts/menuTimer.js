/*
	name: 		Menu Timer
	author: 	UnitedCatdom
	versoin: 	1.0.0
	desc: 		Shows time remaining in menu
*/

document.addEventListener("DOMContentLoaded", () => {
	let timer = document.createElement("span");
	timer.style = `
		position: fixed;
		top: 30vh;
		left: 0;
		width: 100vw;
		height: auto;
		text-align: center;
		color: white;
		font-size: 18px;
		z-index: 9999999;
	`;
	timer.id = "MenuTimer";
	document.body.appendChild(timer);

	setInterval(() => {
		let ctime = document.querySelector("#specTimer").textContent;
		let menuvis = document.querySelector("#menuHolder").style.display;
		let tmr = document.querySelector("span#MenuTimer");
		if (tmr) {
			tmr.textContent = ctime;
			if (menuvis !== "none") {
				tmr.style.display = "unset";
			} else {
				tmr.style.display = "none";
			};
		};
	}, 1000)
})