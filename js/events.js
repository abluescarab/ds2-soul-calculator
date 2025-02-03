document.addEventListener("DOMContentLoaded", function () {
    form.reset();
    loadData();
});

form.addEventListener("reset", (e) => {
    toggleResult(false);
    saveData();
    e.target.reset();
});

document.getElementById("move-left").addEventListener("click", () => {
    if (goalInput.value == "") {
        return;
    }

    startInput.value = goalInput.value;
    goalInput.value = "";
    goalInput.focus();
    saveData();
    toggleResult(false);
});

document.getElementById("plus-one").addEventListener("click", (e) => {
    let val = parseInt(startInput.value);

    if (!val) {
        return;
    }

    goalInput.value = val + 1;
    calculate();
});

document
    .getElementById("change-theme")
    .addEventListener("click", () => changeTheme());

document
    .getElementById("accept-cookies")
    .addEventListener("click", function (e) {
        cookies.set(cookieNames.allowed, "true");
        document.getElementById("cookie-banner").style.display = "none";
        saveData();
    });

document
    .getElementById("decline-cookies")
    .addEventListener("click", function (e) {
        cookies.set(cookieNames.allowed, "false");
        document.getElementById("cookie-banner").style.display = "none";
    });

startInput.addEventListener("input", changeInput);

goalInput.addEventListener("input", changeInput);
