function loadData() {
    const banner = document.getElementById("cookie-banner");
    const cookiesAllowed = cookies.get(cookieNames.allowed);

    if (cookiesAllowed === null) {
        banner.style.display = "block";
    } else {
        banner.style.display = "none";
    }

    if (cookiesAllowed !== "true") {
        return;
    }

    if (cookies.get(cookieNames.theme) === "dark") {
        changeTheme("dark");
    }

    const startLevel = cookies.get(cookieNames.startLevel);
    const goalLevel = cookies.get(cookieNames.goalLevel);

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
    if (cookies.get(cookieNames.allowed) !== "true") {
        return;
    }

    cookies.set(cookieNames.startLevel, startInput.value);
    cookies.set(cookieNames.goalLevel, goalInput.value);
}

function toggleResult(show = true) {
    table.style.display = show ? "table" : "none";
    document.getElementById("result").style.display = show
        ? "inline-block"
        : "none";
}

function changeTheme(theme = "") {
    const body = document.getElementsByTagName("body")[0];

    if (theme != "") {
        body.dataset.theme = theme;
    } else {
        body.dataset.theme = body.dataset.theme == "light" ? "dark" : "light";
    }

    if (cookies.get(cookieNames.allowed) === "true") {
        cookies.set(cookieNames.theme, body.dataset.theme);
    }
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

    const souls = levels
        .slice(startVal, goalVal)
        .reduce((a, b) => a + b)
        .toLocaleString();
    const tableBody = table.getElementsByTagName("tbody")[0];

    document.getElementById("start-display").innerText = startInput.value;
    document.getElementById("goal-display").innerText = goalInput.value;
    document.getElementById("result-display").innerText = souls;

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
