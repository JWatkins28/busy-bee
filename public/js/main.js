// GRAB BOTTOM BUTTONS

function pageLoad() {
    var page = window.location.pathname.toLowerCase();
    if (page.includes("home")) {
        // HIGHLIGHT BUTTON FOR HOME
    } else if (page.includes("mytasks")) {
        // HIGHLIGHT BUTTON FOR TASKS
    } else {
        // HIGHLIGHT BUTTON FOR PROFILE
    }
}
pageLoad();