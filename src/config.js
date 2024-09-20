module.exports = global.config = {
    markers: Object.freeze({
        // Engine : Starter - Extender - (Brick)
    // Non-Engine : Board Breaker - Hand Trap - (Defensive) - Consistency/Power card
        ENGINE: "Engine",
        NON_ENGINE: "Non-Engine",
        STARTER: "Starter",
        EXTENDER: "Extender",
        HAND_TRAP: "Hand Trap",
        BOARD_BREAKER: "Board Breaker"    
    }),
    // classname
    activeTabs: Object.freeze({
        STATS: "statistics",
        CARD_BANK: "card-bank",
        SEARCH: "search"
    }),
    // name for identification
    sources: Object.freeze({
        LISTER: "lister",
        CARD_BANK: "card-bank",
        SEARCH: "search",
        MAIN: "main",
        EXTRA: "extra",
        SIDE: "side",
        BLANK_EXTRA: "blank-extra"
    }),

};