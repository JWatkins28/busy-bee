let honey = document.querySelector('#honey')
let badges = document.querySelector('#badge-container')
let honeyScore = [];

// FUNCTION FOR PROFILE BADGES - ONLY RUNS IF YOU HAVE HONEY
if (honey.innerHTML > 0) {
    const h = honey.innerHTML / 15
    // IF LOOP TO ADD A BADGE FOR EACH "15" HONEY
    if (h > 1) {
        for (let i = 1; i < h; i++) {
            honeyScore.push(`<img src="/images/beemedal1.png" style="height: 50px;"></img>`)
        }
    }

    badges.innerHTML = honeyScore;
    let badgeString = badges.innerHTML;
    // PUSHING HTML LIKE THAT ADDS A , BETWEEN ENTRIES. THIS REMOVES THEM
    let newString = badgeString.replaceAll(`,`, "");
    badges.innerHTML = newString;
}