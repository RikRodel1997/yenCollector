import React from "react";
import { Text } from "react-native";
import { Table } from "./components/Table";

interface OverviewProps {
    records: YenRecord[];
    styles: any;
}

export const TotalOverview: React.FC<OverviewProps> = ({ records, styles }) => {
    const coins = [1, 5, 10, 50, 100, 500];
    const collected = records.filter((record) => record.inPossession).length;
    const missing = records.filter((record) => !record.inPossession).length;
    const data = coins.map((coin) => {
        const recordsByCoin = records.filter(
            (record) => record.yenValue === coin
        );
        const collected = recordsByCoin.filter(
            (record) => record.inPossession
        ).length;
        const missing = recordsByCoin.filter(
            (record) => !record.inPossession
        ).length;
        const percentage = Math.round((collected / recordsByCoin.length) * 100);
        return [`¥${coin}`, collected, missing, `${percentage}%`];
    });
    data.push([
        "Total",
        collected,
        missing,
        `${Math.round((collected / records.length) * 100)}%`,
    ]);

    return (
        <>
            <Text>
                You've collected {collected} coins, but are missing {missing}{" "}
                coins.
            </Text>
            <Table
                headers={["Coin", "Collected", "Missing", "%"]}
                data={data}
                styles={styles}
            />
        </>
    );
};
