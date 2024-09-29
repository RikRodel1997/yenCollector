import React from "react";
import { ScrollView, View, Text } from "react-native";

interface TableProps {
    headers: string[];
    data: any[];
    styles: any;
}

export const Table: React.FC<TableProps> = ({ headers, data, styles }) => {
    return (
        <>
            <ScrollView>
                <ScrollView>
                    <View style={styles.table}>
                        {/* Table Header */}
                        <View style={styles.tableRow}>
                            {headers.map((header, index) => (
                                <Text
                                    key={index}
                                    style={[
                                        styles.tableCell,
                                        styles.tableHeader,
                                    ]}
                                >
                                    {header}
                                </Text>
                            ))}
                        </View>
                        {/* Table Body */}
                        {data.map((data, index) => (
                            <View key={index} style={styles.tableRow}>
                                {data.map((cell: any, i: number) => (
                                    <Text key={i} style={[styles.tableCell]}>
                                        {cell}
                                    </Text>
                                ))}
                            </View>
                        ))}
                    </View>
                </ScrollView>
            </ScrollView>
        </>
    );
};
