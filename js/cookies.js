const cookiePrefix = "ds2Calculator_";

const cookies = Object.freeze({
    allowed: "cookiesAllowed",
    theme: "theme",
    startLevel: "startLevel",
    goalLevel: "goalLevel",
});

// modified from https://stackoverflow.com/a/25490531
function getCookie(name) {
    let cookieName = cookiePrefix + name;
    let result = document.cookie.match(
        "(^|;)\\s*" + cookieName + "\\s*=\\s*([^;]*)"
    );

    if (result === null) {
        return null;
    }

    return result.pop();
}

// copied from https://stackoverflow.com/a/24103596
function setCookie(name, value, days) {
    let expires = "";

    if (days) {
        let date = new Date();
        date.setDate(date.getDate() + days);
        expires = "; expires=" + date.toUTCString();
    }

    document.cookie =
        cookiePrefix +
        name +
        "=" +
        (value || "") +
        expires +
        "; path=/; SameSite=Lax";
}
