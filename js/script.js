const form = document.getElementById("calculator");
const startInput = document.getElementById("start-level");
const goalInput = document.getElementById("goal-level");
const moveLeftButton = document.getElementById("move-left");
const result = document.getElementById("result");
const table = document.getElementById("levels");
const themeButton = document.getElementById("change-theme");
const acceptCookiesButton = document.getElementById("accept-cookies");
const declineCookiesButton = document.getElementById("decline-cookies");

document.addEventListener("DOMContentLoaded", function (e) {
    form.addEventListener("reset", reset);
    moveLeftButton.addEventListener("click", moveLeft);
    startInput.addEventListener("input", changeInput);
    goalInput.addEventListener("input", changeInput);
    themeButton.addEventListener("click", () => changeTheme());

    acceptCookiesButton.addEventListener("click", function (e) {
        setCookie(cookies.allowed, "true", 365);
        document.getElementById("cookie-banner").style.display = "none";
        saveData();
    });

    declineCookiesButton.addEventListener("click", function (e) {
        setCookie(cookies.allowed, "false", 365);
        document.getElementById("cookie-banner").style.display = "none";
    });

    form.reset();
    loadData();
});

function loadData() {
    const banner = document.getElementById("cookie-banner");
    const cookiesAllowed = getCookie(cookies.allowed);

    if (cookiesAllowed === null) {
        banner.style.display = "block";
    } else {
        banner.style.display = "none";
    }

    if (cookiesAllowed !== "true") {
        return;
    }

    if (getCookie(cookies.theme) === "dark") {
        changeTheme("dark");
    }

    const startLevel = getCookie(cookies.startLevel);
    const goalLevel = getCookie(cookies.goalLevel);

    if (startLevel !== null) {
        startInput.value = startLevel;
    }

    if (goalLevel !== null) {
        goalInput.value = goalLevel;
    }

    if (startLevel !== null || goalLevel !== null) {
        calculate();
    }
}

function saveData() {
    if (getCookie(cookies.allowed) !== "true") {
        return;
    }

    setCookie(cookies.startLevel, startInput.value, 365);
    setCookie(cookies.goalLevel, goalInput.value, 365);
}

function toggleResult(show = true) {
    table.style.display = show ? "table" : "none";
    result.style.display = show ? "inline-block" : "none";
}

function reset(ev) {
    toggleResult(false);
    saveData();
    ev.target.reset();
}

function changeTheme(theme = "") {
    const body = document.getElementsByTagName("body")[0];

    if (theme != "") {
        body.dataset.theme = theme;
    } else {
        body.dataset.theme = body.dataset.theme == "light" ? "dark" : "light";
    }

    if (getCookie(cookies.allowed) === "true") {
        setCookie(cookies.theme, body.dataset.theme, 365);
    }
}

function moveLeft() {
    if (goalInput.value == "") {
        return;
    }

    startInput.value = goalInput.value;
    goalInput.value = "";
    goalInput.focus();
    saveData();
    toggleResult(false);
}

function changeInput(ev) {
    const e = ev.target;
    const val = parseInt(e.value);
    const min = parseInt(e.min);
    const max = parseInt(e.max);

    if (val > max) {
        e.value = e.max;
    } else if (val < min) {
        e.value = e.min;
    }

    calculate();
}

function calculate() {
    const startVal = parseInt(startInput.value);
    const goalVal = parseInt(goalInput.value);

    saveData();

    if (
        startInput.value == "" ||
        goalInput.value == "" ||
        startVal >= goalVal
    ) {
        toggleResult(false);
        return;
    }

    toggleResult(true);

    const startDisplay = document.getElementById("start-display");
    const goalDisplay = document.getElementById("goal-display");
    const resultDisplay = document.getElementById("result-display");

    startDisplay.innerText = startInput.value;
    goalDisplay.innerText = goalInput.value;

    const souls = levels
        .slice(startVal, goalVal)
        .reduce((a, b) => a + b)
        .toLocaleString();
    const tableBody = table.getElementsByTagName("tbody")[0];

    resultDisplay.innerText = souls;
    tableBody.innerHTML = "";

    for (let i = startVal; i < goalVal; i++) {
        const tr = tableBody.insertRow();
        const level = tr.insertCell();
        const souls = tr.insertCell();
        const total = tr.insertCell();

        level.innerText = i + 1;
        souls.innerText = levels[i].toLocaleString();
        total.innerText = levels
            .slice(startVal, i)
            .reduce((a, b) => a + b, levels[i])
            .toLocaleString();
    }
}
