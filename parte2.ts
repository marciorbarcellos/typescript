export { }

type Platform = 'XBOX' | 'PC' | 'PLAYSTATION';

type RecordItem = {
    gameTitle: string;
    gamePlatform: Platform,
    genreName: string;
}

type Game = {
    id: number;
    title: string;
    platform: Platform;
}

const gameList : Game[] = [
    {
        "id": 1,
        "title": "Puppy Dog Runner",
        "platform": "XBOX"
    },
    {
        "id": 2,
        "title": "Ping Pong",
        "platform": "PLAYSTATION"
    },
    {
        "id": 3,
        "title": "Hotel-Hideaway",
        "platform": "PC"
    }
]

const recordItemList : RecordItem[] = [
    {
        "gameTitle": "Ping Pong",
        "gamePlatform": "PLAYSTATION",
        "genreName": "RPG"
    },
    {
        "gameTitle": "Puppy Dog Runner",
        "gamePlatform": "XBOX",
        "genreName": "RPG"
    },
    {
        "gameTitle": "Hotel-Hideaway",
        "gamePlatform": "PC",
        "genreName": "Shooter"
    },
    {
        "gameTitle": "Hotel-Hideaway",
        "gamePlatform": "PC",
        "genreName": "Shooter"
    },
    {
        "gameTitle": "Ping Pong",
        "gamePlatform": "PLAYSTATION",
        "genreName": "RPG"
    },
]

const buildBarSeries = (games : Game[], records : RecordItem[]) => {

    const mappedGames = games.map(game => {
        const filteredGames = records.filter(item => {
            return item.gameTitle === game.title && item.gamePlatform === game.platform;
        });

        return {
            x: `${game.title} | ${game.platform}`,
            y: filteredGames.length
        }
    });

    const sortedGames = mappedGames.sort((a, b) => b.y - a.y);

    return sortedGames.slice(0, 8);
}

const getPlatformChartData = (records : RecordItem[]) => {

    const platforms = ['PC', 'PLAYSTATION', 'XBOX'];

    const series = platforms.map(platform => {
        const filteredGames = records.filter(item => {
            return platform === item.gamePlatform;
        });

        return filteredGames.length;
    });

    return {
        labels: platforms,
        series
    };
}

const getGenreChartData = (records : RecordItem[]) => {

    const computeRecordItem = (dictionary, recordItem : RecordItem) => {
        if (dictionary[recordItem.genreName] !== undefined) {
            dictionary[recordItem.genreName] += 1;
        }
        else {
            dictionary[recordItem.genreName] = 1;
        }

        return dictionary;
    }

    const genreByAmount = records.reduce(computeRecordItem, {} as Record<string, number>);

    const labels = Object.keys(genreByAmount);
    const series = labels.map(x => genreByAmount[x]);

    return {
        labels,
        series
    }
}

console.log('GRÁFICO DE BARRAS ----------------------------');
console.log(buildBarSeries(gameList, recordItemList));

console.log('GRÁFICO DE ROSCA (PLATAFORMAS) --------------------------');
console.log(getPlatformChartData(recordItemList));

console.log('GRÁFICO DE ROSCA (GÊNEROS) --------------------------');
console.log(getGenreChartData(recordItemList));
