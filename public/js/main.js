// CHECKS WHAT PAGE WE'RE ON AND COLORS THE MOBILE VIEW BUTTONS BASED ON THAT
function pageLoad() {
    var page = window.location.pathname.toLowerCase();
    const profile = document.querySelector('#profile-btm-btn')
    const mytasks = document.querySelector('#tasks-btm-btn')
    const home = document.querySelector('#home-btm-btn')
    if (page.includes("profile")) {
        profile.style.backgroundColor = "#FFC107"
        profile.style.color = "white"
        mytasks.style.backgroundColor = "white"
        home.style.backgroundColor = "white"
    } else if (page.includes("task")) {
        mytasks.style.backgroundColor = "#FFC107"
        mytasks.style.color = "white"
        home.style.backgroundColor = "white"
        profile.style.backgroundColor = "white"
    } else {
        home.style.backgroundColor = "#FFC107"
        home.style.color = "white"
        profile.style.backgroundColor = "white"
        mytasks.style.backgroundColor = "white"
    }
}

// RUN SCRIPT IF LOGGED IN
if (document.querySelector('#home-btm-btn')) {
pageLoad();
}
