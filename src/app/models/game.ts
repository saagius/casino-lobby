interface GameTypes {
    realMode: number;
    funMode?: number;
    viewMode?: number;
    is_target?: number;
}

export interface GameCategory {
    id: string;
    title: string;
    type: string;
}

interface GameFeature {
    id: string;
    title: string;
    type: string;
}

interface GameTheme {
    id: string;
    title: string;
    type: string;
}

export interface GameProvider {
    id: string;
    title: string;
}

export interface Game {
    categories: string[];
    features: string[];
    themes: string[];
    icons: string[];
    backgrounds: string[];
    id: string;
    server_game_id: string;
    extearnal_game_id: string;
    front_game_id: string;
    name: string;
    title?: string;
    width?: string;
    height?: string;
    ratio?: string;
    status: string;
    provider: string;
    show_as_provider: string;
    provider_title: string;
    game_options?: string;
    blocked_countries: string[];
    has_age_restriction: number;
    icon_2: string;
    icon_3?: string;
    background?: string;
    types: GameTypes;
    game_skin_id: string;
    cats: GameCategory[];
    feats: GameFeature[];
    thms: GameTheme[];
    active: string;
}