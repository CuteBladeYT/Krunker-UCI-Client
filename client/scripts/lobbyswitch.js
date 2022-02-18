/*
	name: 		Lobby Switch
	author: 	UnitedCatdom
	versoin: 	1.0.0
	desc: 		Changes lobby on F4 click
*/

document.addEventListener("keyup", (event) => {
	let pk = event.key;
	if (pk == "F4") {
		window.location.href = "https://krunker.io";
	};
}, false) 