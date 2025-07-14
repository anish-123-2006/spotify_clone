async function main() {
    let songs = [];
    let currentIndex = -1;

    const response = await fetch("songs.json");
    songs = await response.json(); 
    let player = document.getElementById("player");
    let pausebutton = document.querySelector(".pause");
    let playbutton = document.querySelector(".play");
    let nextbutton = document.querySelector(".next");
    let previousbutton = document.querySelector(".previous");
    let timeline = document.getElementById("timeline");
    let timelinevolume = document.getElementById("timelinevolume");
    let songdisplay = document.querySelector(".song");
    let current = document.querySelector(".currenttime");
    let total = document.querySelector(".totaltime");
    let menuicon = document.querySelector(".menuicon");
    let sidebar = document.querySelector(".sidebar");

    songs.forEach((song, index) => {
        let card = document.createElement("div");
        card.classList.add("card", "transparent");

        card.innerHTML = `
            <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="300" fill="#FAD45A" />
              <circle cx="50" cy="50" r="20" fill="black" />
              <path d="M40 45 Q50 40, 60 45" stroke="white" stroke-width="2" fill="none"/>
              <path d="M41 50 Q50 47, 59 50" stroke="white" stroke-width="2" fill="none"/>
              <path d="M42 55 Q50 53, 58 55" stroke="white" stroke-width="2" fill="none"/>
              <text x="50%" y="150" text-anchor="middle" font-family="Arial, sans-serif" font-size="24" fill="black">
                <tspan x="50%" dy="0">${song.name}</tspan>
              </text>
            </svg>
            <div class="play-button">
                <svg viewBox="0 0 24 24" class="play-icon" aria-hidden="true">
                    <path d="M7.05 3.606 20.54 11.394a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606" fill="black" />
                </svg>
            </div>
            <h3 class="transparent text">${song.name}</h3>
            <p class="transparent description">${song.artist}</p>`;

        card.addEventListener("click", () => {
            currentIndex = index;
            player.src = encodeURI(song.url);
            player.play();
            pausebutton.style.display = "block";
            playbutton.style.display = "none";
            songdisplay.innerHTML = song.name;
        });

        document.querySelector(".cardcontainer").append(card);
    });

    pausebutton.addEventListener("click", () => {
        pausebutton.style.display = "none";
        playbutton.style.display = "block";
        player.pause();
    });

    playbutton.addEventListener("click", () => {
        playbutton.style.display = "none";
        pausebutton.style.display = "block";
        player.play();
    });

    nextbutton.addEventListener("click", () => {
        if (songs.length === 0) return;

        currentIndex = (currentIndex + 1) % songs.length;
       player.src = encodeURI(songs[currentIndex].url);
        player.play();
        pausebutton.style.display = "block";
        playbutton.style.display = "none";
        songdisplay.innerHTML = songs[currentIndex].name;
    });

    previousbutton.addEventListener("click", () => {
        if (songs.length === 0) return;

        currentIndex = (currentIndex - 1 + songs.length) % songs.length;
       player.src = encodeURI(songs[currentIndex].url);
        player.play();
        pausebutton.style.display = "block";
        playbutton.style.display = "none";
        songdisplay.innerHTML = songs[currentIndex].name;
    });

    player.addEventListener("timeupdate", () => {
        let progress = (player.currentTime / player.duration) * 100;
        timeline.value = progress || 0;

        let tt = (player.duration / 60).toFixed(2).replace(".", ":");
        let ct = (player.currentTime / 60).toFixed(2).replace(".", ":");

        total.innerHTML = tt;
        current.innerHTML = ct;
    });

    timeline.addEventListener("input", () => {
        player.currentTime = (timeline.value / 100) * player.duration;
    });

    timelinevolume.addEventListener("input", () => {
        player.volume = timelinevolume.value / 100;
    });

    menuicon.addEventListener("click", () => {
        sidebar.classList.toggle("open");
    });
}

main();
