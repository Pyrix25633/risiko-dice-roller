//Elements
let addAttacker1 = document.getElementById("add-attacker-1");
let addAttacker10 = document.getElementById("add-attacker-10");
let attackerCounterSpan = document.getElementById("attacker-counter");
let attackerCounter = 0;
let deleteAttacker = document.getElementById("delete-attacker");

let addDefender1 = document.getElementById("add-defender-1");
let addDefender10 = document.getElementById("add-defender-10");
let defenderCounterSpan = document.getElementById("defender-counter");
let defenderCounter = 0;
let deleteDefender = document.getElementById("delete-defender");

let attackerDice1 = document.getElementById("attacker-dice-1");
let attackerDice2 = document.getElementById("attacker-dice-2");
let attackerDice2Disabled = false;
let attackerDice3 = document.getElementById("attacker-dice-3");
let attackerDice3Disabled = false;
let attackerDices = [6, 6, 6];

let defenderDice1 = document.getElementById("defender-dice-1");
let defenderDice2 = document.getElementById("defender-dice-2");
let defenderDice2Disabled = false;
let defenderDice3 = document.getElementById("defender-dice-3");
let defenderDice3Disabled = false;
let defenderDices = [6, 6, 6];

let attackerDice2Generated = false;
let attackerDice3Generated = false;
let defenderDice2Generated = false;
let defenderDice3Generated = false;

let showAttackerDice1 = false;
let showDefenderDice1 = false;

let start = document.getElementById("start");
let startDisabled = false;
let switchButton = document.getElementById("switch");

//Functions
function modifyAttackerCounter() {
    let zeros = "";
    if(attackerCounter < 10) {
        zeros = "00";
    }
    else if(attackerCounter < 100) {
        zeros = "0";
    }
    attackerCounterSpan.innerHTML = zeros + attackerCounter;
}

function modifyDefenderCounter() {
    let zeros = "";
    if(defenderCounter < 10) {
        zeros = "00";
    }
    else if(defenderCounter < 100) {
        zeros = "0";
    }
    defenderCounterSpan.innerHTML = zeros + defenderCounter;
}

function generateDice() {
    let rand = Math.floor(Math.random() * 6 + 1);
    return rand;
}

function displayDices() {
    let disabledAttacker = "./img/dice_attacker_disabled.svg";
    let disabledDefender = "./img/dice_defender_disabled.svg";

    if(attackerCounter > 1 || showAttackerDice1)
        attackerDice1.src = "./img/dice_attacker_" + attackerDices[0] + ".svg";
    else attackerDice1.src = disabledAttacker;
    if(attackerDice2Disabled)
        attackerDice2.src = disabledAttacker;
    else
        attackerDice2.src = "./img/dice_attacker_" + attackerDices[1] + ".svg";
    if(attackerDice3Disabled)
        attackerDice3.src = disabledAttacker;
    else
        attackerDice3.src = "./img/dice_attacker_" + attackerDices[2] + ".svg";

    if(defenderCounter > 0 || showDefenderDice1)
        defenderDice1.src = "./img/dice_defender_" + defenderDices[0] + ".svg";
    else defenderDice1.src = disabledDefender;
    if(defenderDice2Disabled)
        defenderDice2.src = disabledDefender;
    else
        defenderDice2.src = "./img/dice_defender_" + defenderDices[1] + ".svg";
    if(defenderDice3Disabled)
        defenderDice3.src = disabledDefender;
    else
        defenderDice3.src = "./img/dice_defender_" + defenderDices[2] + ".svg";

    if(attackerCounter > 1 && defenderCounter > 0 && !startDisabled)
        start.src = "./img/risiko.svg";
    else start.src = "./img/risiko_disabled.svg";
}

function disableDices() {
    if(attackerCounter < 4) {
        if(attackerCounter == 3) {
            attackerDice3Disabled = true;
        }
        else {
            attackerDice2Disabled = true;
            attackerDice3Disabled = true;
        }
    }
    if(defenderCounter < 3) {
        if(defenderCounter == 2) {
            defenderDice3Disabled = true;
        }
        else {
            defenderDice2Disabled = true;
            defenderDice3Disabled = true;
        }
    }
    displayDices();
}

function generateAttackerDices() {
    attackerDices[0] = generateDice();
    attackerDice2Generated = !attackerDice2Disabled;
    if(attackerDice2Generated)
        attackerDices[1] = generateDice();
    else attackerDices[1] = 1;
    attackerDice3Generated = !attackerDice3Disabled;
    if(attackerDice3Generated)
        attackerDices[2] = generateDice();
    else attackerDices[2] = 1;
    attackerDices.sort();
    attackerDices.reverse();
}

function generateDefenderDices() {
    defenderDices[0] = generateDice();
    defenderDice2Generated = !defenderDice2Disabled;
    if(defenderDice2Generated)
        defenderDices[1] = generateDice();
    else defenderDices[1] = 1;
    defenderDice3Generated = !defenderDice3Disabled;
    if(defenderDice3Generated)
        defenderDices[2] = generateDice();
    else defenderDices[2] = 1;
    defenderDices.sort();
    defenderDices.reverse();
}

function startGeneration() {
    generateAttackerDices();
    generateDefenderDices();
    displayDices();
    if(attackerDices[0] > defenderDices[0]) defenderCounter -= 1;
    else attackerCounter -= 1;
    if(!attackerDice2Disabled && !defenderDice2Disabled) {
        if(attackerDices[1] > defenderDices[1]) defenderCounter -= 1;
        else attackerCounter -= 1;
    }
    if(!attackerDice3Disabled && !defenderDice3Disabled) {
        if(attackerDices[2] > defenderDices[2]) defenderCounter -= 1;
        else attackerCounter -= 1;
    }
    modifyAttackerCounter();
    modifyDefenderCounter();
}

//Buttons
addAttacker1.addEventListener("click", () => {
    attackerCounter += 1;
    modifyAttackerCounter();
})

addAttacker10.addEventListener("click", () => {
    attackerCounter += 10;
    modifyAttackerCounter();
})

deleteAttacker.addEventListener("click", () => {
    attackerCounter = 0;
    modifyAttackerCounter();
})

addDefender1.addEventListener("click", () => {
    defenderCounter += 1;
    modifyDefenderCounter();
})

addDefender10.addEventListener("click", () => {
    defenderCounter += 10;
    modifyDefenderCounter();
})

deleteDefender.addEventListener("click", () => {
    defenderCounter = 0;
    modifyDefenderCounter();
})

attackerDice2.addEventListener("click", () => {
    if(attackerDice3Disabled) {
        attackerDice2Disabled = !attackerDice2Disabled;
        displayDices();
    }
})

attackerDice3.addEventListener("click", () => {
    attackerDice3Disabled = !attackerDice3Disabled;
    if(attackerDice2Disabled) attackerDice2Disabled = false;
    displayDices();
})

defenderDice2.addEventListener("click", () => {
    if(defenderDice3Disabled) {
        defenderDice2Disabled = !defenderDice2Disabled;
        displayDices();
    }
})

defenderDice3.addEventListener("click", () => {
    defenderDice3Disabled = !defenderDice3Disabled;
    if(defenderDice2Disabled) defenderDice2Disabled = false;
    displayDices();
})

start.addEventListener("click", () => {
    if(attackerCounter > 1 && defenderCounter > 0 && !startDisabled)
        startGeneration()
});

//Reset
modifyAttackerCounter(0);
modifyDefenderCounter(0);

resetInterval = setInterval(disableDices, 500);

//Switch
switchButton.addEventListener("click", () => {
    if(startDisabled) {
        startDisabled = false;
        start.src = "./img/risiko.svg"
        showAttackerDice1 = false;
        showDefenderDice1 = false;
        disableDices();
        resetInterval = setInterval(disableDices, 500);
    }
    else {
        startDisabled = true;
        start.src = "./img/risiko_disabled.svg"
        clearInterval(resetInterval);
        attackerDice2Disabled = !attackerDice2Generated;
        attackerDice3Disabled = !attackerDice3Generated;
        defenderDice2Disabled = !defenderDice2Generated;
        defenderDice3Disabled = !defenderDice3Generated;
        showAttackerDice1 = true;
        showDefenderDice1 = true;
        displayDices();
    }
})