const Config = {
    colors: {
        normal: "#ffffff",
        bifurcated: "#00aeff",
        golden: "#ffe600",
        meaty: "#e92e0d",
        caramelized: "#e4882c"
    },

    effects: {
        glow: true
    }
};

const LUMP_TYPES = {
    0: "normal",
    1: "bifurcated",
    2: "golden",
    3: "meaty",
    4: "caramelized"
};

function update() {
    if (!lumpsAmountElement) return;

    lumpsAmountElement.style.color = Config.colors[LUMP_TYPES[Game.lumpCurrentType]];
}

const lumpsAmountElement = document.getElementById("lumpsAmount");

Game.registerHook("draw", update);