/**
 * @name Menu Timer
 * @author UnitedCatdom
 * @version 0.1.1
 * @description Displays time left to end of round in menu
 */

let timer = document.createElement("span");
let timerVal = document.querySelector("#timerVal");
timer.style = `
    color: white;
    font-size: 35px;
    position: fixed;
    top: 20vh;
    left: 0;
    width: 100vw;
    text-align: center;
    z-index: 9999999999;
`;
document.querySelector("#menuHolder").appendChild(timer);
setInterval(() => {
    timer.textContent = timerVal.textContent;
}, 1000);
