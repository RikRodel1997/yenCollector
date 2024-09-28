export const generateData = (coin: number): CoinData[] => {
    const eras = [
        {
            jp: "昭和",
            en: "Showa",
            eraRange: [23, 64],
            yearRange: [1948, 1989],
        },
        {
            jp: "平成",
            en: "Heisei",
            eraRange: [1, 31],
            yearRange: [1989, 2019],
        },
        {
            jp: "令和",
            en: "Reiwa",
            eraRange: [1, 6],
            yearRange: [2019, 2024],
        },
    ];

    const data: CoinData[] = [];
    for (const era of eras) {
        for (let i = era.eraRange[0]; i <= era.eraRange[1]; i++) {
            const coinData: CoinData = {
                year: era.yearRange[0] + i - era.eraRange[0],
                eraEn: era.en,
                eraJp: `${era.jp}${i === 1 ? "元" : i}`,
                coin: coin,
            };
            data.push(coinData);
        }
    }
    return data;
};

export const randomNumber = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export type CoinData = {
    year: number;
    eraEn: string;
    eraJp: string;
    coin: number;
    in_possession?: boolean;
    condition?: string;
};
