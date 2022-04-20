document.addEventListener("DOMContentLoaded", () => {
    // Header Text
    setInterval(() => {
        let el = document.querySelector("header button span");
        let vis = el.style.opacity == "1";
        if (vis) el.style.opacity = "0";
        else el.style.opacity = "1";
    }, 600);

    fetch("https://raw.githubusercontent.com/CuteBladeYT/Krunker-UCI-Client/main/README.md").then(r => (r.blob().then(x => x.text().then(x => {
        let el = document.querySelector("pre#github_readme");
        el.textContent = x;
        el.id = "";
    }))));
});