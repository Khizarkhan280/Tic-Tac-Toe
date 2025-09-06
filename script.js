const winPosition = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8], [2, 4, 6], [0, 3, 6], [1, 4, 7], [2, 5, 8]]
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".resetbtn"); // ✅ select the actual button
let showMsg = document.querySelector(".resultMsg");
let showButton = document.querySelector(".buttons");
let winnerText = document.querySelector(".resultMsg");
let continueText = document.querySelector(".singleLine");
let turn = document.querySelector(".turn")
let plyr1Turn = true;
let firstTurnPlyr1 = true;
let player1Score = document.querySelector(".player1Score")
let player2Score = document.querySelector(".player2Score")
let drawScore = document.querySelector(".drawScore")
let continueBtn = document.querySelector(".continueButton")
let underline = document.querySelector(".underline")
let player1Win = false;
let player2Win = false;
let drawWin = false;
let winnerFound = false;


// Add this function to animate the underline
function animateUnderline(position) {
    const underline = document.querySelector('.underline');

    // Reset any previous animations
    underline.style.animation = 'none';
    underline.offsetHeight; /* Trigger reflow */

    // Apply the appropriate animation based on position
    if (position[0] === 0 && position[1] === 4 && position[2] === 8 ||
        position[0] === 2 && position[1] === 4 && position[2] === 6) {
        // Diagonal lines
        underline.style.animation = 'diagonalGrow 0.5s forwards';
    } else if (position[0] === 0 && position[1] === 3 && position[2] === 6 ||
        position[0] === 1 && position[1] === 4 && position[2] === 7 ||
        position[0] === 2 && position[1] === 5 && position[2] === 8) {
        // Vertical lines
        underline.style.animation = 'verticalGrow 0.5s forwards';
    } else {
        // Horizontal lines
        underline.style.animation = 'underlineGrow 0.5s forwards';
    }
}

//Reset
let resetGame = () => {
    plyr1Turn = true;
    showButton.classList.add("visiblity");
    showMsg.classList.add("visiblity");
    for (const box of boxes) {
        box.classList.add("animation");
        box.innerHTML = ""
        box.disabled = false;
    }
    winnerText.classList.add("winColor", "lossColor", "drawColor")
    turn.innerHTML = `<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`;
    winnerFound = false;
    turn.style.animation = "pulseCross 2s infinite";
    player1Win = false;
    player2Win = false;
    drawWin = false;
    player1Score.innerText = 0
    player2Score.innerText = 0
    drawScore.innerText = 0

    // reset underline styles
    underline.classList.add("visiblity");
    underline.style.transform = "translateX(-50%)";
    underline.style.top = "";
    underline.style.left = "50%";
    underline.style.width = "0"; // Reset to 0 width
    underline.style.marginTop = "";
    underline.classList.remove("crossColor", "circleColor");
    underline.style.animation = 'none'; // Remove any animation
}

// --------- FIXED RESET BUTTON HANDLING ----------

// Main click handler: reset the game and prevent the hover transform from reappearing
resetBtn.addEventListener("click", () => {
    resetGame();

    // remove focus (helpful on some mobile/desktop combos)
    resetBtn.blur();

    // temporarily block hover styles so the button returns visually to original state
    resetBtn.classList.add("nohover");

    // remove the override after the CSS transition time (0.2s) + small buffer
    setTimeout(() => {
        resetBtn.classList.remove("nohover");
    }, 220);
});

// Extra safety: when pointer/touch events happen, ensure nohover is toggled appropriately
["mousedown", "touchstart"].forEach(evt => {
    resetBtn.addEventListener(evt, () => {
        resetBtn.classList.add("nohover");
    });
});
["mouseup", "touchend", "mouseleave"].forEach(evt => {
    resetBtn.addEventListener(evt, () => {
        setTimeout(() => resetBtn.classList.remove("nohover"), 220);
    });
});
// ------------------------------------------------


//Check Draw
const checkDraw = () => {
    let spaceEmpty = false;
    let idx = 0;
    while (spaceEmpty == false && idx <= 8) {
        if (boxes[idx].innerHTML == "") {
            spaceEmpty = true
        }
        else {
            idx = idx + 1;
        }
    }
    if (spaceEmpty == false && winnerFound == false) {
        drawWin = true;
        announceDraw();
    }
}

//Check Winner
let checkWinner = () => {
    for (const position of winPosition) {
        let pos1 = boxes[position[0]].innerHTML;
        let pos2 = boxes[position[1]].innerHTML;
        let pos3 = boxes[position[2]].innerHTML;

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 == pos2 && pos1 == pos3) {
                winnerFound = true;
                announceWinner(pos1);
                underline.classList.remove("visiblity")

                if (position[0] == 0 && position[1] == 1 && position[2] == 2) {
                    underline.style.marginTop = "56px";
                }
                else if (position[0] == 3 && position[1] == 4 && position[2] == 5) {
                    underline.style.marginTop = "161px";
                }
                else if (position[0] == 6 && position[1] == 7 && position[2] == 8) {
                    underline.style.marginTop = "265px";
                }
                else if (position[0] == 0 && position[1] == 4 && position[2] == 8) {
                    underline.style.width = "0"; // Start from 0
                    underline.style.top = "50%";
                    underline.style.transform = "translate(-50%, -50%) rotate(45deg)";
                    underline.style.transformOrigin = "center";
                }
                else if (position[0] == 2 && position[1] == 4 && position[2] == 6) {
                    underline.style.width = "0"; // Start from 0
                    underline.style.top = "50%";
                    underline.style.transform = "translate(-50%, -50%) rotate(-45deg)";
                    underline.style.transformOrigin = "center";
                }
                else if (position[0] == 0 && position[1] == 3 && position[2] == 6) {
                    underline.style.width = "0"; // Start from 0
                    underline.style.top = "49%";
                    underline.style.left = "18.3%";
                    underline.style.transform = "translateX(-50%) rotate(90deg)";
                    underline.style.transformOrigin = "center";
                }
                else if (position[0] == 1 && position[1] == 4 && position[2] == 7) {
                    underline.style.width = "0"; // Start from 0
                    underline.style.top = "49%";
                    underline.style.transform = "translateX(-50%) rotate(90deg)";
                    underline.style.transformOrigin = "center";
                }
                else if (position[0] == 2 && position[1] == 5 && position[2] == 8) {
                    underline.style.width = "0"; // Start from 0
                    underline.style.top = "49%";
                    underline.style.left = "82%";
                    underline.style.transform = "translateX(-50%) rotate(90deg)";
                    underline.style.transformOrigin = "center";
                }

                // Animate the underline
                setTimeout(() => {
                    animateUnderline(position);
                }, 10);
            }
        }
    }
}

boxes.forEach(
    (box) => {
        box.addEventListener("click",
            () => {
                
                if (plyr1Turn) {
                    box.innerHTML = (`<i class="fa-solid fa-xmark cross"></i>`);
                    plyr1Turn = false;
                    checkWinner();
                    checkDraw();
                    turn.innerHTML = (`<i class="fa-regular fa-circle circle"></i> <span>Turn</span>`);
                    turn.style.animation = "pulseCircle 2s infinite";
                }
                else {
                    box.innerHTML = (`<i class="fa-regular fa-circle circle"></i>`);
                    plyr1Turn = true;
                    checkWinner();
                    checkDraw();
                    turn.innerHTML = (`<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`);
                    turn.style.animation = "pulseCross 2s infinite";
                    
                }
                box.disabled = true;
                box.classList.remove("animation");
            }
        )
    }
)

//Disable click
const disableBox = () => {
    for (const box of boxes) {
        box.disabled = true;
        box.classList.remove("animation");
    }
}

//Winner Announcement
let announceWinner = (pos1) => {
    showMsg.classList.remove("visiblity");
    showButton.classList.remove("visiblity");
    disableBox();
    continueText.innerHTML = (`${pos1} <h1>Takes The Round</h1>`);
    if (pos1.includes("fa-xmark")) {
        underline.classList.add("crossColor");
        winnerText.innerHTML = (`<h1><span>Player1</span> <span>Won!</span></h1>`);
        winnerText.classList.remove("lossColor", "drawColor");
        player1Win = true;
    }
    else if (pos1.includes("fa-circle")){
        underline.classList.add("circleColor")
        winnerText.innerHTML = (`<h1><span>Player2</span> <span>Won!</span></h1>`);
        winnerText.classList.remove("winColor", "drawColor");
        player2Win = true;
    }

    if (player1Win) {
        player1Score.innerText = Number(player1Score.innerText) + 1
    }
    else {
        if (player2Win) {
            player2Score.innerText = Number(player2Score.innerText) + 1
        } 
    }
}

//Draw Announcement
let announceDraw = () => {
    showMsg.classList.remove("visiblity");
    showButton.classList.remove("visiblity");
    disableBox();
    continueText.innerHTML = (`<h1>The Round Ends in a Draw</h1>`);
    winnerText.innerHTML = (`<h1>It's a Draw!</h1>`);
    winnerText.classList.remove("lossColor", "winColor");
    if (drawWin) {
        drawScore.innerText = Number(drawScore.innerText) + 1
    }
}

// Continue Button
let continueRound = () => {
    
    plyr1Turn = false;
    showButton.classList.add("visiblity");
    showMsg.classList.add("visiblity");
    for (const box of boxes) {
        box.classList.add("animation");
        box.innerHTML = ""
        box.disabled = false;
    }
    winnerText.classList.add("winColor", "lossColor", "drawColor")

    winnerFound = false;
    turn.style.animation = "pulseCross 2s infinite";
    player1Win = false;
    player2Win = false;
    drawWin = false;

    // reset underline styles here
    underline.classList.add("visiblity");
    underline.style.transform = "translateX(-50%)";
    underline.style.top = "";
    underline.style.left = "50%";
    underline.style.width = "0"; // Reset to 0 width
    underline.style.marginTop = "";
    underline.classList.remove("crossColor", "circleColor");
    underline.style.animation = 'none'; // Remove any animation

    if (firstTurnPlyr1 == true) {
        plyr1Turn = false;
        firstTurnPlyr1 = false;
        turn.innerHTML = `<i class="fa-regular fa-circle circle"></i> <span>Turn</span>`;
        turn.style.animation = "pulseCircle 2s infinite";
    }
    else {
        plyr1Turn = true;
        firstTurnPlyr1 = true;
        turn.innerHTML = (`<i class="fa-solid fa-xmark cross"></i> <span>Turn</span>`);
        turn.style.animation = "pulseCross 2s infinite";
    }
}

continueBtn.addEventListener("click", continueRound);
