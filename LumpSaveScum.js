console.log("LumpSaveScum loaded");


const LUMPS = {
    0: {
        name: "Normal",
        color: "#ffffff"
    },
    1: {
        name: "Bifurcated",
        color: "#00aeff"
    },
    2: {
        name: "Golden",
        color: "#ffe600"
    },
    3: {
        name: "Meaty",
        color: "#e92e0d"
    },
    4: {
        name: "Caramelized",
        color: "#e4882c"
    }
};


function updateCounterColor() {

    if (!lumpsAmountElement) return;

    lumpsAmountElement.style.color = LUMPS[Game.lumpCurrentType].color;
}


const originalLumpTooltip = Game.lumpTooltip;
function updateLumpTooltip() {

    let html = originalLumpTooltip();

    const currentLump = LUMPS[Game.lumpCurrentType];

    html += /*html*/`
    <div class="line"></div>
    <div style="margin-bottom: 8px; font: 11px Tahoma, Arial, sans-serif; font-weight: normal; line-height: 1.2; text-align: center;">
        Current sugar lump:
        <b style="color: ${currentLump.color};">${currentLump.name}</b>
    </div>`

    return html;
}
 
Game.lumpTooltip = updateLumpTooltip;


const lumpsAmountElement = document.getElementById("lumpsAmount");


Game.registerHook("draw", updateCounterColor);