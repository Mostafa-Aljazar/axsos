// Alert when city is clicked
function loadWeather() {
    alert("Loading weather report...");
}

// Hide cookie banner
function acceptCookies() {
    document.getElementById("cookieBox").style.display = "none";
}

// Convert temperatures
function convertTemp() {
    let unit = document.getElementById("tempSelect").value;

    let highs = document.querySelectorAll(".high");
    let lows = document.querySelectorAll(".low");

    for (let i = 0; i < highs.length; i++) {
        let high = parseInt(highs[i].innerText);
        let low = parseInt(lows[i].innerText);

        if (unit === "f") {
            highs[i].innerText = Math.round(high * 9/5 + 32);
            lows[i].innerText = Math.round(low * 9/5 + 32);
        } else {
            highs[i].innerText = Math.round((high - 32) * 5/9);
            lows[i].innerText = Math.round((low - 32) * 5/9);
        }
    }
}