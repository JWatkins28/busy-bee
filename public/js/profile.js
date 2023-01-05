let honey = document.querySelector('#honey')
let badges = document.querySelector('#badge-container')
let honeyScore = [];

if (honey.innerHTML > 0) {
    const h = honey.innerHTML / 15
    if (h > 1) {
        for (let i = 1; i < h; i++) {
            honeyScore.push(`<img src="/images/beemedal1.png" style="height: 50px;"></img>`)
        }
    }
    
    badges.innerHTML = honeyScore;
    let badgeString = badges.innerHTML;
    let newString = badgeString.replaceAll(`,`, "");
    badges.innerHTML = newString;
}