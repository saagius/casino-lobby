import { GameProvider } from 'src/app/models/game';

const games = require("./data.json");

export const getAllGames = () => {
    return games;
}

export const getGameById = id => {
    return games.find(game => game.id.toString() == id);
}

export const searchGamesByProp = (prop, term) => {
    return games.filter(game => game[prop].toLowerCase().includes(term.toLowerCase()))
};

export const getDistinctByType = type => {
    let distinctByType = {};

    games.forEach(game => {
        if(game[type] && game[type].length) {
            game[type].forEach(type => {
                if(!distinctByType[type.id]) {
                    distinctByType[type.id] = type;
                }
            });
        }
    });

    return Object.values(distinctByType).sort(sortByProp('title'));
};

export const getGamesByCategory = id => {
    let gamesByCategory = {};

    games.forEach(game => {
        if(game.cats && game.cats.length) {
            game.cats.forEach(type => {
                if(type.id == id) {
                    if(!gamesByCategory[game.id]) {
                        gamesByCategory[game.id] = game;
                    }
                }
            });
        }
    });

    return Object.values(gamesByCategory);
};

export const getDistinctProviders = () => {
    let distinctProvidersFound: string[] = [];
    let distinctProviders: GameProvider[] = [];

    games.forEach(game => {
        if(distinctProvidersFound.indexOf(game.provider) == -1) {
            distinctProviders.push({
                id: game.provider,
                title: `${game.provider_title} - ${game.provider}`
            });
            distinctProvidersFound.push(game.provider);
        }
    });

    return distinctProviders.sort(sortByProp('title'));
};

export const getGamesByProvider = (provider) => {
    let gamesByProvider = {};

    games.forEach(game => {
        if(game.provider == provider) {
            gamesByProvider[game.id] = game;
        }
    });

    return Object.values(gamesByProvider);
};

const sortByProp = prop => {
    return (a, b) => {
        const valueA = a[prop].toLowerCase();
        const valueB = b[prop].toLowerCase();

        if (valueA < valueB) //sort string ascending
            return -1;

        if (valueA > valueB)
            return 1;

        return 0 //default return value (no sorting)
    }
};