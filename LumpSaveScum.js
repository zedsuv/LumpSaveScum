console.log("LumpSaveScum loaded"); // Probably better to be comment but better for testing and I am lazy to comment/uncomment.

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


// Extend the original Sugar Lump tooltip.
const originalLumpTooltip = Game.lumpTooltip;
function updateLumpTooltip() {

    updateCounterColor(); // This call is here for 
                          // 1) Handle Sugar Lump type changes made by third-party methods.
                          // 2) Give players a way to refresh the counter color in case of any unexpected behavior.

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
 
Game.lumpTooltip = updateLumpTooltip; // Override the vanilla tooltip.


const lumpsAmountElement = document.getElementById("lumpsAmount");
updateCounterColor(); // Initial update after the mod is loaded.

const originalComputeLumpType = Game.computeLumpType;
Game.computeLumpType = function () {
    originalComputeLumpType.apply(this, arguments);

    updateCounterColor();
};