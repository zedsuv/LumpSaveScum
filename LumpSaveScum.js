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
        this.updateCounterColor();

        // Wrap Game.computeLumpType().
        Game.computeLumpType = function () {
            LumpSaveScum.originalComputeLumpType.apply(this, arguments);

            LumpSaveScum.updateCounterColor();
        };

        // Add the mod's settings section to the Options menu.
        Game.customOptionsMenu.push(function () {
            CCSE.AppendCollapsibleOptionsMenu(
                LumpSaveScum.menuName,
                LumpSaveScum.getMenuString()
            );
        });        

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

        this.updateCounterColor();

    },
    
    /* ========== Settings ========== */

    // Build the mod's section in the Options menu.
    getMenuString() {
        return /*html*/ `
            <div class="listing">
                <a id="lumpColorButton"
                class="smallFancyButton prefButton option ${this.settings.updateCounterColorEnabled ? "" : "off"}"
                onclick="LumpSaveScum.toggleCounterColor();">
                    Counter Color ${this.settings.updateCounterColorEnabled ? "ON" : "OFF"}
                </a>
                <label>
                    (changes the sugar lump counter color based on the current lump type)
                </label>
            </div>`;

    },

    

    /* ========== Helper Methods ========== */

    
    // Toggle sugar lump counter color update.
    toggleCounterColor() {

        this.settings.updateCounterColorEnabled = !this.settings.updateCounterColorEnabled;

        const button = document.getElementById("lumpColorButton");

        if (button) {

            button.innerHTML =
                `Counter Color ${this.settings.updateCounterColorEnabled ? "ON" : "OFF"}`;

            button.classList.toggle(
                "off",
                !this.settings.updateCounterColorEnabled
            );

        }

        PlaySound('snd/tick.mp3');

        this.updateCounterColor();

    },

    // Change the Sugar Lump counter color.
    updateCounterColor() {

        if (!this.lumpsAmountElement) return;

        if (!this.settings.updateCounterColorEnabled) {
            this.lumpsAmountElement.style.color = "";
            return;
        }

        if (!this.lumpsAmountElement) return;

        const lump = LUMPS[Game.lumpCurrentType];

        if (!lump) return;

        this.lumpsAmountElement.style.color = lump.color;
    },

    // Extend the original Sugar Lump tooltip.
    updateLumpTooltip() {

        LumpSaveScum.updateCounterColor();

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

if (typeof CCSE === "undefined") {
    Game.LoadMod("https://klattmose.github.io/CookieClicker/CCSE.js");
}

if (!LumpSaveScum.isLoaded) {

    if (window.CCSE && CCSE.isLoaded) {

        LumpSaveScum.launch();

    } else {

        if (!window.CCSE) window.CCSE = {};
        if (!window.CCSE.postLoadHooks) window.CCSE.postLoadHooks = [];

        window.CCSE.postLoadHooks.push(LumpSaveScum.launch);
    }
}
