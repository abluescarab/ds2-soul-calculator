class Cookies {
    prefix = "";
    expiryDays = 365;
    path = "/";
    sameSite = "Lax";

    constructor(prefix) {
        this.prefix = prefix;
    }

    // modified from https://stackoverflow.com/a/25490531
    get(name) {
        let result = document.cookie.match(
            `(^|;)\\s*${this.prefix}${name}\\s*=\\s*([^;]*)`
        );

        if (result === null) {
            return null;
        }

        return result.pop();
    }

    // modified from https://stackoverflow.com/a/24103596
    set(name, value) {
        let expires = "";

        if (this.expiryDays > -1) {
            let date = new Date();
            date.setDate(date.getDate() + this.expiryDays);
            expires = date.toUTCString();
        }

        document.cookie =
            `${this.prefix}${name}=${value || ""}; ` +
            `expires=${expires}; ` +
            `path=${this.path}; ` +
            `SameSite=${this.sameSite}`;
    }
}
