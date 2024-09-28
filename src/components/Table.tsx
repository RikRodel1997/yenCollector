import React from "react";
import { ScrollView, View, Text } from "react-native";

interface TableProps {
    headers: string[];
    data: YenRecord[];
    styles: any;
}

export const Table: React.FC<TableProps> = ({ headers, data, styles }) => {
    const coins = [1, 5, 10, 50, 100, 500];
    return (
        <>
            <ScrollView>
                <ScrollView horizontal={true}>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            {headers.map((header, index) => (
                                <Text
                                    key={index}
                                    style={[
                                        styles.tableCell,
                                        styles.tableHeader,
                                        index === 0
                                            ? { minWidth: 90 }
                                            : { minWidth: 50 },
                                    ]}
                                >
                                    {header}
                                </Text>
                            ))}
                        </View>

                        {/* Table Body */}
                        {data.map((row) => {
                            return (
                                <View key={row.id} style={styles.tableRow}>
                                    <Text
                                        style={[
                                            styles.tableCell,
                                            { minWidth: 90 },
                                        ]}
                                    >
                                        {row.eraJp}
                                    </Text>
                                    {coins.map((coin) => {
                                        const isPossessed =
                                            row.inPossession &&
                                            row.yenValue === coin;

                                        if (isPossessed) {
                                            console.log(
                                                `Checking coin: ${coin}, In possession: ${row.inPossession}, Yen Value: ${row.yenValue}, Is Possessed: ${isPossessed}`
                                            );
                                        }

                                        return (
                                            <Text
                                                key={`${row.id}-${coin}`} // Use a unique key for each coin
                                                style={[
                                                    styles.tableCell,
                                                    {
                                                        minWidth: 50,
                                                        backgroundColor:
                                                            isPossessed
                                                                ? "green"
                                                                : "red",
                                                    },
                                                ]}
                                            />
                                        );
                                    })}
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
            </ScrollView>
        </>
    );
};
