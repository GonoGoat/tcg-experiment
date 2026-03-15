export enum CARD_ZONE {
    MAIN = "main",
    EXTRA = "extra",
    SIDE = "side",
    BANK = "bank"
}

export enum ED_MONSTER_TYPE {
    FUSION = "fusion",
    SYNCHRO = "synchro",
    XYZ = "xyz",
    LINK = "link"
}

export enum MARKER {
    // Engine : Starter - Extender - (Brick)
    // Non-Engine : Board Breaker - Hand Trap - (Defensive) - Consistency/Power card
    DEFAULT = "default",
    ENGINE = "Engine",
    NON_ENGINE = "Non-Engine",
    STARTER = "Starter",
    EXTENDER = "Extender",
    HAND_TRAP = "Hand Trap",
    BOARD_BREAKER = "Board Breaker"    
}

export enum MARKING_MODE {
    INACTIVE = "inactive",
    ACTIVE = "active",
}

export enum ACTIVE_TAB {
    STATS = "figures",
    BANK = "bank",
    OPTIONS = "options",
    VISUALIZER = "visualizer"
    //SEARCH = "search"
}