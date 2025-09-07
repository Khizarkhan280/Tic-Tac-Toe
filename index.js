let cpuBtn = document.querySelector(".cpuBtn");
let playerBtn = document.querySelector(".playerBtn");


let vsCpuBtn = document.querySelector(".cpuBtn");
let vsPlayerBtn = document.querySelector(".playerBtn");
let crossMark = document.querySelector(".crossMark");
let circleMark = document.querySelector(".circleMark");

// Select player mark
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
    sessionStorage.removeItem("playerbutton"); // remove player residue
    window.location.href = "game.html";
});
// New game vs Plaer
vsPlayerBtn.addEventListener("click", () => {
    sessionStorage.setItem("fromHome", "true");
    sessionStorage.setItem("playerbutton", "player");
    sessionStorage.removeItem("cpubutton"); // remove CPU residue
    window.location.href = "game.html";
});




crossMark.addEventListener("click",
    () => {
        sessionStorage.setItem("playerMark", "X");   // save X

        crossMark.classList.add("homeCrossBtn");
        circleMark.classList.remove("homeCircleBtn");
        crossMark.classList.remove("crossHover");
        circleMark.classList.add("circleHover");
    }
)
circleMark.addEventListener("click",
    () => {
        sessionStorage.setItem("playerMark", "O");   // save O
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
    // Replace previous history entry with this home URL (removes the previous entry if same-origin).
    history.replaceState(null, '', location.href);

    // Push an extra state so "Back" hits popstate and we can force staying on this page
    history.pushState(null, '', location.href);

    window.addEventListener('popstate', function () {
        console.log('popstate fired — preventing back navigation');
        // Recreate the pushed state so user can't go back
        history.pushState(null, '', location.href);
    });
});

