// Hi

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


const LumpSaveScum = {

    name: "LumpSaveScum",
    version: "1.1",
    isLoaded: false,

    lumpsAmountElement: null,
    originalLumpTooltip: null,
    originalComputeLumpType: null,

    /* Options */
    menuName: "LumpSaveScum Settings",

    settings: {
        updateCounterColorEnabled: true
    },

    init() {

        // Store vanilla functions.
        this.originalLumpTooltip = Game.lumpTooltip;
        this.originalComputeLumpType = Game.computeLumpType;

        // Store DOM references.
        this.lumpsAmountElement = document.getElementById("lumpsAmount");

        // Override the vanilla tooltip.
        Game.lumpTooltip = this.updateLumpTooltip;

        // Initial update after the mod is loaded.
        // this.updateCounterColor();

        // Wrap Game.computeLumpType().
        Game.computeLumpType = function () {
            LumpSaveScum.originalComputeLumpType.apply(this, arguments);

            // LumpSaveScum.updateCounterColor();
        };

        // Mod Loaded 👍🏻
        this.isLoaded = true;
    },

    // Save mod settings.
    save() {

        return JSON.stringify(this.settings);

    },

    // Load mod settings.
    load(str) {

        if (!str) return;

        const data = JSON.parse(str);

        // Overwrite default settings with saved values.
        Object.keys(this.settings).forEach(key => {

            if (data[key] !== undefined) {
                this.settings[key] = data[key];
            }

        });

        // this.updateCounterColor();

    },

    /* ========== Helper Methods ========== */

    // Toggle sugar lump counter color update.
    toggleCounterColor() {

        this.settings.updateCounterColorEnabled = !this.settings.updateCounterColorEnabled;

        this.updateCounterColor();

    },

    // Change the Sugar Lump counter color.
    updateCounterColor() {

        if (!this.lumpsAmountElement) return;

        if (!this.settings.updateCounterColorEnabled) {
            this.lumpsAmountElement.style.color = "";
            return;
        }

        const lump = LUMPS[Game.lumpCurrentType];

        if (!lump) return;

        this.lumpsAmountElement.style.color = lump.color;
    },

    // Extend the original Sugar Lump tooltip.
    updateLumpTooltip() {

        // LumpSaveScum.updateCounterColor();

        let html = LumpSaveScum.originalLumpTooltip();

        const currentLump = LUMPS[Game.lumpCurrentType];

        html += /*html*/ `
        <div class="line"></div>
            <div style="margin-bottom:8px;font:11px Tahoma,Arial,sans-serif;font-weight:normal;line-height:1.2;text-align:center;">
            Current sugar lump:
            <b style="color:${currentLump.color};">${currentLump.name}</b>
        </div>`;

        return html;
    }
};


LumpSaveScum.launch = function () {

    Game.registerMod(LumpSaveScum.name, LumpSaveScum);

};

if (!LumpSaveScum.isLoaded) {

    LumpSaveScum.launch();

}