window.onload = (() => {
    if (localStorage["uci_resolution"]) {

    } else {
        localStorage["uci_resolution"] = "100 100";
    };
    if (localStorage["uci_resolution"] == "") {
        localStorage["uci_resolution"] = "100 100";
    };
    createCanvas("https://krunker.io/", localStorage["uci_resolution"]);
    createSettings();
    sessionStorage["uci__settingsOpened"] = 0;
    document.querySelector("settingsTab .client__setting_input#keybind").value = localStorage["uci_changeLobbyKey"];
})

function createCanvas(csrc, size) {
    var appbase = document.querySelector("#app_mount");
    var canvas = document.createElement("iframe");
    canvas.id = "gameCanvas";
    canvas.src = csrc;
    var width = size.split(" ")[0];
    var height = size.split(" ")[1];
    canvas.style.width = width;
    canvas.style.height = height;
    appbase.appendChild(canvas);
}

function createSettings() {
    var settingsButton = document.createElement("button");
    settingsButton.className = "client__settingsButton";
    settingsButton.innerHTML = "<img src='./uci-c/imgs/settingsIcon.png' class='client__settingsButton_icon'>";
    settingsButton.onclick = (() => {
        var isOpened = parseFloat(sessionStorage["uci__settingsOpened"]);
        var settingsTab = document.querySelector("settingsTab");
        switch (isOpened) {
            case 0:
                sessionStorage["uci__settingsOpened"] = 1;
                settingsTab.style.left = "0";
                break;
            case 1:
                sessionStorage["uci__settingsOpened"] = 0;
                settingsTab.style.left = "-35vw";
        };
    });
    document.body.appendChild(settingsButton);

    document.querySelector("settingsTab .client__setting_input#width").value = localStorage["uci_resolution"].split(" ")[0];
    document.querySelector("settingsTab .client__setting_input#height").value = localStorage["uci_resolution"].split(" ")[1];
    document.querySelector("settingsTab .client__setting_header").innerHTML = "Change Resolution | " + localStorage["uci_resolution"].split(" ")[0] + "x" + localStorage["uci_resolution"].split(" ")[1];
}

function client_changeResolution() {
    var width = document.querySelector("settingsTab .client__setting_input#width").value;
    var height = document.querySelector("settingsTab .client__setting_input#height").value;
    document.querySelector("settingsTab .client__setting_header").innerHTML = "Change Resolution | " + width + "x" + height;
    var gameCanvas = document.querySelector("#gameCanvas");
    localStorage["uci_resolution"] = width + " " + height;
    gameCanvas.style = `
        position: fixed;
        width: ` + width + `vw;
        height: ` + height + `vh;
        top: calc(100vh / 2 - (` + height + `vh / 2));
        left: calc(100vw / 2 - (` + width + `vw / 2));
        border: none;
    `;
}





// Lobby Changer
function uci_lobbyChangeKey() {
    localStorage["uci_changeLobbyKey"] = document.querySelector("settingsTab .client__setting_input#keybind").value;
}
document.addEventListener("keyup", (event) => {
    var pressedKey = event.key;
    var key = localStorage["uci_changeLobbyKey"];
    if (pressedKey == key) {
        document.querySelector("#app_mount iframe").src = "https://krunker.io";
    };
}, false)