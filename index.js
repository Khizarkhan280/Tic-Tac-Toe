let cpuBtn = document.querySelector(".cpuBtn");
let playerBtn = document.querySelector(".playerBtn");
let vsCpuBtn = document.querySelector(".cpuBtn");
let vsPlayerBtn = document.querySelector(".playerBtn");
let crossMark = document.querySelector(".crossMark");
let circleMark = document.querySelector(".circleMark");

// Select player mark

sessionStorage.setItem("playerMark", "");

crossMark.addEventListener("click", () => {
    sessionStorage.setItem("playerMark", "X");
});
circleMark.addEventListener("click", () => {
    sessionStorage.setItem("playerMark", "O");
});


// New game vs CPU

vsCpuBtn.addEventListener("click", () => {
    sessionStorage.setItem("fromHome", "true");
    sessionStorage.setItem("cpubutton", "cpu");
    sessionStorage.removeItem("playerbutton");
    window.location.href = "game.html";
});

// New game vs Plaer

vsPlayerBtn.addEventListener("click", () => {
    sessionStorage.setItem("fromHome", "true");
    sessionStorage.setItem("playerbutton", "player");
    sessionStorage.removeItem("cpubutton");
    window.location.href = "game.html";
});

crossMark.addEventListener("click",
    () => {
        sessionStorage.setItem("playerMark", "X");
        crossMark.classList.add("homeCrossBtn");
        circleMark.classList.remove("homeCircleBtn");
        crossMark.classList.remove("crossHover");
        circleMark.classList.add("circleHover");
    }
)

circleMark.addEventListener("click",
    () => {
        sessionStorage.setItem("playerMark", "O");
        circleMark.classList.add("homeCircleBtn");
        crossMark.classList.remove("homeCrossBtn");
        circleMark.classList.remove("circleHover");
        crossMark.classList.add("crossHover");
    }
)

playerBtn.addEventListener("click",
    () => {
        sessionStorage.setItem("fromHome", "true");  // mark that user came from home
        window.location.href = "game.html";
    }
)

// Delete history

window.addEventListener('load', () => {
    history.replaceState(null, '', location.href);
    history.pushState(null, '', location.href);
    window.addEventListener('popstate', function () {
        console.log('popstate fired — preventing back navigation');
        history.pushState(null, '', location.href);
    });
});

