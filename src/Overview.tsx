import React from "react";
import { Text } from "react-native";
import { Table } from "./components/Table";

interface OverviewProps {
    records: YenRecord[];
    styles: any;
}

export const Overview: React.FC<OverviewProps> = ({ records, styles }) => {
    const coins = [1, 5, 10, 50, 100, 500];
    const headers = ["Era", "¥1", "¥5", "¥10", "¥50", "¥100", "¥500"];

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
            {/* {coins.map((coin, index) => renderCoin(records, coin, styles))} */}
            {coins.map((coin, index) => (
                <Table
                    headers={headers}
                    data={records.filter((value) => {
                        return value.yenValue === coin;
                    })}
                    styles={styles}
                />
            ))}
        </>
    );
};

const renderCoin = (records: YenRecord[], coin: number, styles: any) => {
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
