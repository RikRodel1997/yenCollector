import React, { useState, useEffect } from "react";
import { Text, FlatList } from "react-native";

interface YenOverviewProps {
    records: YenRecord[];
}

export const YenOverview: React.FC<YenOverviewProps> = ({ records }) => {
    const coins = [1, 5, 10, 50, 100, 500];

    return (
        <>
            <Text>Overview{"\n"}</Text>
            <Text>
                You've collected{" "}
                {records.filter((record) => record.inPossession).length} coins
            </Text>
            <Text>
                You're missing{" "}
                {records.filter((record) => !record.inPossession).length} coins
                {"\n"}
            </Text>
            {coins.map((coin, index) => renderCoin(records, coin))}
        </>
    );
};

const renderCoin = (records: YenRecord[], coin: number) => {
    const recordsByCoin = records.filter((record) => record.yenValue === coin);
    return (
        <>
            <Text>
                {coin} yen coins -{" "}
                {Math.round(
                    (recordsByCoin.filter((record) => record.inPossession)
                        .length /
                        recordsByCoin.length) *
                        100
                )}
                %
            </Text>
            <Text>
                Collected:{" "}
                {recordsByCoin.filter((record) => record.inPossession).length}
            </Text>
            <Text>
                Missing:{" "}
                {recordsByCoin.filter((record) => !record.inPossession).length}
                {"\n"}
            </Text>
        </>
    );
};
